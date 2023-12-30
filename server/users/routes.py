from flask import request, session, jsonify,  Blueprint, send_file
from server import db, bcrypt
from server.models import User, Topic, Module, Query
import os
import json
from flask_cors import cross_origin
from server.users.utils import module_image_from_web,generate_module_summary,generate_content,generate_submodules,generate_content_from_web,generate_module_summary_from_web,generate_submodules_from_web,trending_module_summary_from_web,generate_pdf
from deep_translator import GoogleTranslator
from lingua import LanguageDetectorBuilder
from iso639 import Lang
from server.recommender_system.recommendations import recommend_module, popular_topics
from sqlalchemy import desc

users = Blueprint(name='users', import_name=__name__)

# Detector for language detection
detector = LanguageDetectorBuilder.from_all_languages().with_preloaded_language_models().build()

# register route  --> take username from client only store in database if username is not taking
@users.route('/register',methods=['POST'])
@cross_origin(supports_credentials=True)
def register():
    # take user input
    data = request.json
    fname = data.get("firstName")  # Access the 'fname' variable from the JSON data
    lname = data.get("lastName")
    user_name = fname + " " + lname
    email = data.get("email")
    password = data.get("password")
    country = data.get("country")
    state = data.get("state")
    city = data.get("city")
    gender = data.get("gender")
    age = data.get("age")
    interests = data.get("interest")

    # check if user has already registered by same email
    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"message": "User already exists", "response":False}), 201
    
    # hash password, create new user save to database
    hash_pass = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(fname=fname, lname=lname, user_name=user_name, email=email, password=hash_pass, country=country, state=state, city=city, gender=gender, age=age, interests=interests)
    db.session.add(new_user)
    db.session.commit()

    # return response
    response = jsonify({"message": "User created successfully", "id":new_user.user_id, "email":new_user.email, "response":True}), 201
    return response


# login route  --> add username to session and make it unique in user model
@users.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    # take user input
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # check user is registered or not
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"message": "Unregistered email id", "response":False}), 200
    
    # check password
    if not bcrypt.check_password_hash(user.password, password.encode('utf-8')):
        return jsonify({"message": "Incorrect password", "response":False}), 200
    
    # start user session
    session["user_id"] = user.user_id
    print("user id is this:-",session.get('user_id'))

    # return response
    return jsonify({"message": "User logged in successfully", "user_name":user.user_name, "email":user.email, "response":True}), 200


# user account  --> profile pic remaining, only keeping /user as route for now
# later add /user/<int:user_id> route for viewing other users profile and user engagement
@users.route('/user', methods=['GET'])
@cross_origin(supports_credentials=True)
def getuser():
    # check if user is logged in
    user_id = session.get("user_id", None)
    if user_id is None:
        return jsonify({"message": "User not logged in", "response":False}), 401
    
    # check if user exists
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found", "response":False}), 404
    
    user_queries = user.user_query_association
    if user_queries is None:
        query_message = "You have not searched for any topic yet. Please search for a topic to get recommendations."
        recommended_topics = popular_topics()
        recommended_topic_names = [Topic.query.get(topic_id).topic_name for topic_id in recommended_topics]
    else:
        latest_query = Query.query.filter_by(user_id=1).order_by(desc(Query.date_search)).first() 
        base_module = Module.query.filter_by(topic_id=latest_query.topic_id).first()
        recommended_modules = recommend_module(base_module.module_id)
        recommended_topic_content = {}
        for module_id in recommended_modules:
            module = Module.query.get(module_id)
            recommended_topic_content[module.module_name] = module.summary
        
    
    # user_queries = [query.query_name for query in user.queries]
    # user_completed_topics = {}
    # user_started_topics = {}
    
    # for topic in user.completed_topics:
    #     if topic.date_completed is None:
    #         user_started_topics[topic.topic_name] = {"level":topic.level, "module":topic.module}
    #     user_completed_topics[topic.topic_name] = {"level":topic.level, "module":topic.module, "date_completed":topic.date_completed, "quiz_score":topic.quiz_score}

    response = {"message":"User found", "user_name":user.user_name, "email":user.email, "interests":user.interests, "response":True}

    return jsonify(response), 200


# logout route
@users.route('/logout', methods=['GET'])
@cross_origin(supports_credentials=True)
def logout():
    session.pop("user_id", None)
    return jsonify({"message": "User logged out successfully", "response":True}), 200



# delete user route --> user dependent queries and completed topics will also be deleted no need to delete them separately
@users.route('/delete', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete():
    # check if user is logged in
    user_id = session.get("user_id", None)
    if user_id is None:
        return jsonify({"message": "User not logged in", "response":False}), 401
    
    # check if user exists
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found", "response":False}), 404
    
    # select all queries and completed topics by user and delete them
    # user_saved_queries = user.queries
    # user_saved_topics = user.completed_topics

    db.session.delete(user)
    # db.session.delete(user_saved_queries)
    # db.session.delete(user_saved_topics)
    db.session.commit()

    # return response
    return jsonify({"message": "User deleted successfully", "response":True}), 200


# trending route --> Fetching trending topics from web and generating module summary
# later make it user personalized
@users.route('/query2/trending/<string:domain>', methods=['GET'])
@cross_origin(supports_credentials=True)
def trending_query(domain):
    text=trending_module_summary_from_web(domain)
    print(text)
    return jsonify({"message": "Query successful", "domain": domain,  "content": text, "response":True}), 200


def translate_module_summary(content, target_language):
    if target_language=='en':
        return content
    
    trans_content = {}
    for key, value in content.items():
        trans_key = GoogleTranslator(source='en', target=target_language).translate(str(key))
        trans_content[trans_key] = GoogleTranslator(source='en', target=target_language).translate(str(value))
    return trans_content


def translate_submodule_content(content, target_language):
    if target_language=='en':
        return content
    
    trans_content = []
    for entry in content:
        temp = {}
        for key, value in entry.items():
            if key == 'urls':
                temp[key] = value
                continue
            if key == 'subsections':
                temp[key] = []
                temp_subsections = {}
                for subsection in value:
                    for sub_key, sub_value in subsection.items():
                        temp_subsections[sub_key] = GoogleTranslator(source='auto', target=target_language).translate(str(sub_value))
                    temp[key].append(temp_subsections)
            else:
                temp[key] = GoogleTranslator(source='auto', target=target_language).translate(str(value))
        trans_content.append(temp)
    return trans_content


# query route --> if websearch is true then fetch from web and feed into model else directly feed into model
# save frequently searched queries in database for faster retrieval
@users.route('/query2/<string:topicname>/<string:level>/<string:websearch>', methods=['GET'])
@cross_origin(supports_credentials=True)
def query_topic(topicname,level,websearch):
    # check if user is logged in
    user_id = session.get('user_id')
    print(session.get('user_id'))
    if user_id is None:
        return jsonify({"message": "User not logged in", "response":False}), 401
    
    # check if user exists
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found", "response":False}), 404

    # language detection for input provided
    source_language = Lang(str(detector.detect_language_of(topicname)).split('.')[1].title()).pt1
    print(f"Source Language: {source_language}")

    # translate other languages input to english
    trans_topic_name = GoogleTranslator(source='auto', target='en').translate(topicname)
    print(f"Translated topic name: {trans_topic_name}")

    # check if topic exists in database along with its modulenames and summaries
    topic = Topic.query.filter_by(topic_name=trans_topic_name).first()
    if topic:
        modules = Module.query.filter_by(topic_id=topic.topic_id, level=level).all()
        module_ids = {module.module_name:module.module_id for module in modules}
        module_summary_content = {module.module_name:module.summary for module in modules}
        trans_module_summary_content = translate_module_summary(module_summary_content, source_language)
        print(f"Translated module summary content: {trans_module_summary_content}")
        
        return jsonify({"message": "Query successful", "topic_id":topic.topic_id, "topic":trans_topic_name, "source_language":source_language, "module_ids":module_ids, "content": trans_module_summary_content, "response":True}), 200

    # if topic does not exist in database then save topic generate module summary and save it in database
    if(websearch=="true"):
        module_summary_content = generate_module_summary_from_web(topic=trans_topic_name,level=level)
    else:    
        module_summary_content = generate_module_summary(topic=trans_topic_name,level=level)

    topic = Topic(topic_name=trans_topic_name)
    db.session.add(topic)
    db.session.commit()
    print(f"topic added to database: {topic}")
    module_ids = {}
    for modulename, modulesummary in module_summary_content.items():
        new_module = Module(
            module_name=modulename,
            topic_id=topic.topic_id,
            level=level,
            summary=modulesummary
        )
        db.session.add(new_module)
        db.session.commit()
        module_ids[modulename] = new_module.module_id

    # add user query to database
    new_user_query = Query(user_id=user.user_id, topic_id=topic.topic_id, lang=source_language)
    db.session.add(new_user_query)
    db.session.commit()

    # translate module summary content to source language
    trans_module_summary_content = translate_module_summary(module_summary_content, source_language)
    print(f"Translated module summary content: {trans_module_summary_content}")

    return jsonify({"message": "Query successful", "topic_id":topic.topic_id, "topic":trans_topic_name, "source_language":source_language, "module_ids":module_ids, "content": trans_module_summary_content, "response":True}), 200


# module query --> generate mutlimodal content (with images) for submodules in a module
@users.route('/query2/<int:module_id>/<string:source_language>/<string:websearch>', methods=['GET'])
@cross_origin(supports_credentials=True)
def query_module(module_id, source_language, websearch):
    # check if user is logged in
    user_id = session.get("user_id", None)
    if user_id is None:
        return jsonify({"message": "User not logged in", "response":False}), 401
    
    # check if user exists
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found", "response":False}), 404

    # check if submodules are saved in database for give module_id
    module = Module.query.get(module_id)
    images= module_image_from_web(module.module_name)
    if module.submodule_content is not None:
        trans_submodule_content = translate_submodule_content(module.submodule_content, source_language)
        print(f"Translated submodule content: {trans_submodule_content}")
        return jsonify({"message": "Query successful", "images":images, "content": trans_submodule_content, "response": True}), 200
    
    # if submodules are not generated generate and save them in database
    if websearch=="true":
        submodules = generate_submodules_from_web(module.module_name)
        print(submodules)
        content = generate_content_from_web(submodules)
    else:
        submodules = generate_submodules(module.module_name)
        print(submodules)
        content = generate_content(submodules)
    module.submodule_content = content
    db.session.commit()

    # translate submodule content to source language
    trans_submodule_content = translate_submodule_content(content, source_language)
    print(f"Translated submodule content: {trans_submodule_content}")
    
    return jsonify({"message": "Query successful","images": images, "content": trans_submodule_content, "response": True}), 200


# download route --> generate pdf for module summary and module content
# currently generate pdf for latin and devanagari scripts 
@users.route('/query2/<int:module_id>/<string:source_language>/download', methods=['GET'])
def download_pdf(module_id, source_language):
    # clean_modulename = modulename.replace(':',"_") 
    # # Construct paths to module summary and content JSON files
    # summary_file_path = os.path.join(os.getcwd(), "content", f"{topicname}_{level}", source_language, "module_summary.json")
    # content_file_path = os.path.join(os.getcwd(), "content", f"{topicname}_{level}", source_language, f"{clean_modulename}_content.json")

    # # Check if both files exist
    # if not os.path.exists(content_file_path):
    #     return jsonify({"message": "Module content file not found", "response": False}), 404
    # if not os.path.exists(summary_file_path):
    #     return jsonify({"message": "Module summary file not found", "response": False}), 404
    
    # # Read module summary from JSON
    # with open(summary_file_path, "r") as summary_file:
    #     module_summary = json.load(summary_file)

    # # Read module content from JSON
    # with open(content_file_path, "r") as content_file:
    #     module_content = json.load(content_file)

    # get module from database
    module = Module.query.get(module_id)
    modulename = module.module_name
    clean_modulename = modulename.replace(':',"_") 
    module_summary = module.summary
    submodule_content = module.submodule_content

    # translate module summary and submodule content to source language
    trans_modulename = GoogleTranslator(source='en', target=source_language).translate(modulename)
    trans_module_summary = GoogleTranslator(source='en', target=source_language).translate(module_summary)
    trans_submodule_content = translate_submodule_content(submodule_content, source_language)

    # Create a PDF file
    download_dir = os.path.join(os.getcwd(), "downloads")
    os.makedirs(download_dir, exist_ok=True)
    pdf_file_path = os.path.join(download_dir, f"{clean_modulename}_summary.pdf")

    # Call the generate_pdf function with the custom_styles argument
    generate_pdf(pdf_file_path, trans_modulename, trans_module_summary, trans_submodule_content, source_language)

    # Send the PDF file as an attachment
    return send_file(pdf_file_path, as_attachment=True)
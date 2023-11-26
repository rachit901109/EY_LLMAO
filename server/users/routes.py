from flask import request, session, jsonify,  Blueprint, send_file
from server import db, bcrypt
from server.models import User, Query
import os
import json
import zipfile
from flask_cors import cross_origin
from server.users.utils import module_image_from_web,generate_module_summary,generate_content,generate_submodules,generate_content_from_web,generate_module_summary_from_web,generate_submodules_from_web,trending_module_summary_from_web,generate_pdf
from deep_translator import GoogleTranslator
# from langdetect import detect
from lingua import Language, LanguageDetectorBuilder
from iso639 import Lang

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
# later add /user/<int:user_id> route for viewing other users profile
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
    
    user_queries = [query.query_name for query in user.queries]
    user_completed_topics = {}
    user_started_topics = {}
    
    for topic in user.completed_topics:
        if topic.date_completed is None:
            user_started_topics[topic.topic_name] = {"level":topic.level, "module":topic.module}
        user_completed_topics[topic.topic_name] = {"level":topic.level, "module":topic.module, "date_completed":topic.date_completed, "quiz_score":topic.quiz_score}

    response = {"message":"User found", "user_name":user.user_name, "email":user.email, "interests":user.interests, "queries":user_queries, "completed_topics":user_completed_topics, "started_topics":user_started_topics, "response":True}

    return jsonify(response), 200


# logout route
@users.route('/logout', methods=['GET'])
@cross_origin(supports_credentials=True)
def logout():
    session.pop("user_id", None)
    return jsonify({"message": "User logged out successfully", "response":True}), 200



# delete user route
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

@users.route('/query2/trending/<string:domain>', methods=['GET'])
@cross_origin(supports_credentials=True)
def trending_query(domain):
    text=trending_module_summary_from_web(domain)
    print(text)
    return jsonify({"message": "Query successful", "domain": domain,  "content": text, "response":True}), 200

# query route
@users.route('/query2/<string:topicname>/<string:level>/<string:websearch>', methods=['GET'])
@cross_origin(supports_credentials=True)
def query_topic(topicname,level,websearch):
    # check if user is logged in
    # user_id = session.get('user_id')
    # print(session.get('user_id'))
    # if user_id is None:
    #     return jsonify({"message": "User not logged in", "response":False}), 401
    
    # # check if user exists
    # user = User.query.get(user_id)
    # if user is None:
    #     return jsonify({"message": "User not found", "response":False}), 404

    # language detection for input provided
    # source_language = detect(topicname)
    source_language = Lang(str(detector.detect_language_of(topicname)).split('.')[1].title()).pt1
    print(source_language)

    # translate other languages input to english
    trans_topic = GoogleTranslator(source='auto', target='en').translate(topicname)
    print(trans_topic)

    content_dir = os.path.join(os.getcwd(), "content")
    topic_level_dir = os.path.join(content_dir, trans_topic+"_"+level)
    lang_dir = os.path.join(topic_level_dir, source_language)

    # create directories if they don't exist
    for dir in [content_dir, topic_level_dir, lang_dir]:
        os.makedirs(dir, exist_ok=True)

    file_path = os.path.join(lang_dir,  "module_summary.json")
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            trans_text = json.load(file)
        print("File exists, I am speed")
        return jsonify({"message": "Query successful", "topic":trans_topic, "source_language":source_language,  "content": trans_text, "response":True}), 200

    if(websearch=="true"):
        text = generate_module_summary_from_web(topic=trans_topic,level=level)
    else:    
        text = generate_module_summary(topic=trans_topic,level=level)
    print(text)

    # add user query to database
    # new_user_query = Query(query_name=trans_topic, user_id=user_id)
    # user.queries.append(new_user_query)
    # db.session.commit()

    trans_text = {}
    
    for key,value in text.items(): 
        trans_key = GoogleTranslator(source='auto', target=source_language).translate(str(key))
        trans_text[trans_key] = GoogleTranslator(source='auto', target=source_language).translate(str(value))
    
    print(trans_text)

    with open(file_path, "w") as file:
        json.dump(trans_text, file, indent=4)

    return jsonify({"message": "Query successful", "topic":trans_topic, "source_language":source_language,  "content": trans_text, "response":True}), 200


@users.route('/query2/<string:topicname>/<string:level>/<string:modulename>/<string:websearch>', methods=['GET'])
@cross_origin(supports_credentials=True)
def query_module(topicname, level, modulename, websearch):
    # check if user is logged in
    # user_id = session.get("user_id", None)
    # if user_id is None:
    #     return jsonify({"message": "User not logged in", "response":False}), 401
    
    # check if user exists
    # user = User.query.get(user_id)
    # if user is None:
    #     return jsonify({"message": "User not found", "response":False}), 404

    # generate content for submodules
    source_language = Lang(str(detector.detect_language_of(modulename)).split('.')[1].title()).pt1
    print(source_language)
    trans_modulename = GoogleTranslator(source='auto', target='en').translate(modulename)
    clean_modulename = modulename.replace(':',"_")  

    content_path = os.path.join(os.getcwd(), "content", topicname+"_"+level, source_language, clean_modulename+"_content.json") 
    images= module_image_from_web(trans_modulename)
    # print("Images list", images) 

    print(content_path, os.path.exists(content_path))
    if os.path.exists(content_path):
        with open(content_path, "r") as file:
            trans_content = json.load(file)
        print("File exists, I am speed")
        return jsonify({"message": "Query successful", "images":images, "content": trans_content, "response": True}), 200

    if websearch=="true":
        submodules = generate_submodules_from_web(trans_modulename)
        print(submodules)
        content = generate_content_from_web(submodules)
    else:
        submodules = generate_submodules(trans_modulename)
        print(submodules)
        content = generate_content(submodules)
    
    
    # translate content for submodules
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
                        temp_subsections[sub_key] = GoogleTranslator(source='auto', target=source_language).translate(str(sub_value))
                    temp[key].append(temp_subsections)
            else:
                temp[key] = GoogleTranslator(source='auto', target=source_language).translate(str(value))
        trans_content.append(temp)

    with open(content_path, "w") as file:
        json.dump(trans_content, file, indent=4)
    
    
    return jsonify({"message": "Query successful","images": images, "content": trans_content, "response": True}), 200


@users.route('/query2/<string:topicname>/<string:level>/<string:source_language>/<string:modulename>/download', methods=['GET'])
def download_pdf(topicname, level, source_language, modulename):
    clean_modulename = modulename.replace(':',"_") 
    # Construct paths to module summary and content JSON files
    summary_file_path = os.path.join(os.getcwd(), "content", f"{topicname}_{level}", source_language, "module_summary.json")
    content_file_path = os.path.join(os.getcwd(), "content", f"{topicname}_{level}", source_language, f"{clean_modulename}_content.json")

    # Check if both files exist
    # if not (os.path.exists(summary_file_path) and os.path.exists(content_file_path)):
    #     return jsonify({"message": "Module files not found", "response": False}), 404
    if not os.path.exists(content_file_path):
        return jsonify({"message": "Module content file not found", "response": False}), 404
    if not os.path.exists(summary_file_path):
        return jsonify({"message": "Module summary file not found", "response": False}), 404
    
    

    # Read module summary from JSON
    with open(summary_file_path, "r") as summary_file:
        module_summary = json.load(summary_file)

    # Read module content from JSON
    with open(content_file_path, "r") as content_file:
        module_content = json.load(content_file)

    # Create a PDF file
    download_dir = os.path.join(os.getcwd(), "downloads")
    os.makedirs(download_dir, exist_ok=True)
    pdf_file_path = os.path.join(download_dir, f"{clean_modulename}_summary.pdf")
    # Assuming you have a styles dictionary defined somewhere in your code


    # Call the generate_pdf function with the custom_styles argument
    generate_pdf(pdf_file_path, modulename, module_summary, module_content, source_language)


    # Send the PDF file as an attachment
    return send_file(pdf_file_path, as_attachment=True)
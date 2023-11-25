from flask import request, session, jsonify,  Blueprint, send_file
from server import db, bcrypt
from server.models import User, Query
import os
import json
import zipfile
from flask_cors import cross_origin
from server.users.utils import generate_module_summary,generate_content,generate_submodules

users = Blueprint(name='users', import_name=__name__)

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
    
    # hash password, create new user save to databse
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
    print(data)
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



# query route
@users.route('/query2/<string:topicname>/<string:level>', methods=['GET'])
@cross_origin(supports_credentials=True)
def query(topicname,level):
    # check if user is logged in
    # user_id = session.get("user_id", None)
    # if user_id is None:
    #     return jsonify({"message": "User not logged in", "response":False}), 401
    
    # # check if user exists
    # user = User.query.get(user_id)
    # if user is None:
    #     return jsonify({"message": "User not found", "response":False}), 404
    
    # # add user query to database
    # new_user_query = Query(query_name=topicname, user_id=user_id)
    # user.queries.append(new_user_query)
    # db.session.commit()
    text = generate_module_summary(topic=topicname,level=level)
    print(text)
    # implement content generation for topic name

    # beg_content = {"module 1": "content for module 1 begineer level", "module 2": "content for module 2 begineer level", "module 3": "content for module 3 begineer level"}
    # inter_content = {"module 1": "content for module 1 intermediate level", "module 2": "content for module 2 intermediate level", "module 3": "content for module 3 intermediate level"}
    # adv_content = {"module 1": "content for module 1 advanced level", "module 2": "content for module 2 advanced level", "module 3": "content for module 3 advanced level"}

    # topic_content = {"beginner": beg_content, "intermediate": inter_content, "advance": adv_content}

    # Save content to content directory
    # content_dir = os.path.join(os.getcwd(), "content")
    # if not os.path.exists(content_dir):
    #     os.makedirs(content_dir)

    # Save content to topicname.json file
    # file_path = os.path.join(content_dir, topicname + ".json")
    # with open(file_path, "w") as file:
    #     json.dump(topic_content, file, indent=4)

    # return response
    return jsonify({"message": "Query successful", "content": text, "response":True}), 200



# New route for querying by topic and level
@users.route('/query2/<string:topicname>', methods=['GET'])
@cross_origin(supports_credentials=True)
def query_by_level(topicname):
    # # check if user is logged in
    # user_id = session.get("user_id", None)
    # if user_id is None:
    #     return jsonify({"message": "User not logged in", "response":False}), 401
    
    # # check if user exists
    # user = User.query.get(user_id)
    # if user is None:
    #     return jsonify({"message": "User not found", "response":False}), 404

    # Check if the topicname.json file exists
    # file_path = os.path.join(os.getcwd(), "content", f"{topicname}.json")
    # if not os.path.exists(file_path):
    #     return jsonify({"message": "Topic not found", "response": False}), 404

    # Load content from the topicname.json file
    # with open(file_path, "r") as file:
    #     topic_content = json.load(file)
    submodules = generate_submodules(topicname)
    print(submodules)
    content = generate_content(submodules)
    # Return content for the requested level
    return jsonify({"message": "Query successful", "content": content, "response": True}), 200



# New route for querying by topic, level, and module
@users.route('/query/<string:topicname>/<string:level>/<string:modulename>', methods=['GET'])
def query_by_module(topicname, level, modulename):
    # check if user is logged in
    user_id = session.get("user_id", None)
    if user_id is None:
        return jsonify({"message": "User not logged in", "response":False}), 401
    
    # check if user exists
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found", "response":False}), 404
    
    # Check if the topicname.json file exists
    file_path = os.path.join(os.getcwd(), "content", f"{topicname}.json")
    if not os.path.exists(file_path):
        return jsonify({"message": "Topic not found", "response": False}), 404

    # Load content from the topicname.json file
    with open(file_path, "r") as file:
        topic_content = json.load(file)

    # Check if the requested level exists in the content
    if level not in topic_content:
        return jsonify({"message": "Level not found", "response": False}), 404

    # Check if the requested module exists in the level content
    if modulename not in topic_content[level]:
        return jsonify({"message": "Module not found", "response": False}), 404

    # Return content for the requested module
    return jsonify({"message": "Query successful", "content": topic_content[level][modulename], "response": True}), 200



# New route for downloading content by topic
@users.route('/query/<string:topicname>/download', methods=['GET'])
def download_topic(topicname):
    # check if user is logged in
    user_id = session.get("user_id", None)
    if user_id is None:
        return jsonify({"message": "User not logged in", "response":False}), 401
    
    # check if user exists
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found", "response":False}), 404

    # Check if the topicname.json file exists
    file_path = os.path.join(os.getcwd(), "content", f"{topicname}.json")
    if not os.path.exists(file_path):
        return jsonify({"message": "Topic not found", "response": False}), 404

    # Load content from the topicname.json file
    with open(file_path, "r") as file:
        topic_content = json.load(file)

    # Save downloaded content to downloads directory
    download_dir = os.path.join(os.getcwd(), "downloads")
    if not os.path.exists(download_dir):
        os.makedirs(download_dir)

    # Create a zip file with three folders for each level
    zip_path = os.path.join(download_dir, f"{topicname}_content.zip")
    with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED) as zip_file:
        for level, content in topic_content.items():
            level_folder = f"{level}_content"

            # Create a subfolder for each level
            zip_file.writestr(f"{level_folder}/", '')

            # Write a txt file for each module in the level
            for module, module_content in content.items():
                zip_file.writestr(f"{level_folder}/{module}_content.txt", module_content)

    return send_file(zip_path, as_attachment=True)



# New route for downloading content by topic and level
@users.route('/query/<string:topicname>/<string:level>/download', methods=['GET'])
def download_level(topicname, level):
    # check if user is logged in
    user_id = session.get("user_id", None)
    if user_id is None:
        return jsonify({"message": "User not logged in", "response":False}), 401
    
    # check if user exists
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found", "response":False}), 404

    # Check if the topicname.json file exists
    file_path = os.path.join(os.getcwd(), "content", f"{topicname}.json")
    if not os.path.exists(file_path):
        return jsonify({"message": "Topic not found", "response": False}), 404

    # Load content from the topicname.json file
    with open(file_path, "r") as file:
        topic_content = json.load(file)

    # Check if the requested level exists in the content
    if level not in topic_content:
        return jsonify({"message": "Level not found", "response": False}), 404
    
    # Save downloaded content to downloads directory
    download_dir = os.path.join(os.getcwd(), "downloads")
    if not os.path.exists(download_dir):
        os.makedirs(download_dir)

    # Create a zip file with txt files for all modules in the requested level
    zip_path = os.path.join(download_dir, f"{topicname}_{level}_content.zip")
    with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED) as zip_file:
        for module, content in topic_content[level].items():
            zip_file.writestr(f"{module}_content.txt", content)

    return send_file(zip_path, as_attachment=True)


# New route for downloading content by topic, level, and module
@users.route('/query/<string:topicname>/<string:level>/<string:modulename>/download', methods=['GET'])
def download_module(topicname, level, modulename):
    # check if user is logged in
    user_id = session.get("user_id", None)
    if user_id is None:
        return jsonify({"message": "User not logged in", "response":False}), 401
    
    # check if user exists
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found", "response":False}), 404

    # Check if the topicname.json file exists
    file_path = os.path.join(os.getcwd(), "content", f"{topicname}.json")
    if not os.path.exists(file_path):
        return jsonify({"message": "Topic not found", "response": False}), 404

    # Load content from the topicname.json file
    with open(file_path, "r") as file:
        topic_content = json.load(file)

    # Check if the requested level exists in the content
    if level not in topic_content:
        return jsonify({"message": "Level not found", "response": False}), 404

    # Check if the requested module exists in the level content
    if modulename not in topic_content[level]:
        return jsonify({"message": "Module not found", "response": False}), 404
    
    # Save downloaded content to downloads directory
    download_dir = os.path.join(os.getcwd(), "downloads")
    if not os.path.exists(download_dir):
        os.makedirs(download_dir)

    # Create a txt file for the requested module content
    txt_content = topic_content[level][modulename]
    txt_path = os.path.join(download_dir, f"{topicname}_{level}_{modulename}_content.txt")
    with open(txt_path, 'w') as txt_file:
        txt_file.write(txt_content)

    return send_file(txt_path, as_attachment=True)
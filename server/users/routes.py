from flask import request, session, jsonify,  Blueprint
from server import db, bcrypt
from server.models import User

users = Blueprint(name='users', import_name=__name__)

# register route
@users.route('/register', methods=['POST'])
def register():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"message": "User already exists", "response":False}), 409
    
    new_user = User(email=email, password=bcrypt.generate_password_hash(password).decode('utf-8'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully", "id":new_user.user_id, "email":new_user.email, "response":True}), 201

# login route
@users.route('/login', methods=['POST'])
def login():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()
    
    if user is None:
        return jsonify({"message": "Unregistered email id", "response":False}), 404
    
    if not bcrypt.check_password_hash(user.password, password.encode('utf-8')):
        return jsonify({"message": "Incorrect password", "response":False}), 401
    
    session["user_id"] = user.user_id
    session["email"] = user.email

    return jsonify({"message": "User logged in successfully", "id":user.user_id, "email":user.email, "response":True}), 200

# get current user route
@users.route('/user', methods=['GET'])
def getuser():
    user_id = session.get("user_id", None)

    if user_id is None:
        return jsonify({"message": "User not logged in", "response":False}), 401
    
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"message": "User not found", "response":False}), 404
    
    return jsonify({"message": "user logged in", "id":user.user_id, "email":user.email, "response":True}), 200

# logout route
@users.route('/logout', methods=['POST'])
def logout():
    session.pop("user_id", None)
    session.pop("email", None)

    return jsonify({"message": "User logged out successfully", "response":True}), 200

# delete user route
@users.route('/delete', methods=['DELETE'])
def delete():
    user_id = session.get("user_id", None)

    if user_id is None:
        return jsonify({"message": "User not logged in", "response":False}), 401
    
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"message": "User not found", "response":False}), 404
    
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully", "response":True}), 200


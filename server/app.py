"""User Auth using MongoClient - Hatim code"""
from flask import Flask,jsonify,request,session,url_for,redirect
from dotenv import load_dotenv
import os
from pymongo import MongoClient

load_dotenv()

app = Flask(__name__)
passw = os.getenv("MONGO_PASS")
app.secret_key = os.getenv("SECRET_KEY")

def auth_middleware():
   if 'user_id' not in session:
       return redirect(url_for('login'))

connection_string = f"mongodb+srv://Alpha131:{passw}@cluster0.blmd3q2.mongodb.net/?retryWrites=true&w=majority"
def MongoDB(collection_name):
    client = MongoClient(connection_string)
    db = client.get_database('SIH')
    collection = db.get_collection(collection_name)
    return collection


@app.route('/register-post',methods=['POST'])
def registerpost():
    new_record = {
    'first_name' : request.form.get('firstName'),
    'last_name' : request.form.get('lastName'),
    'age' : request.form.get('age'),
    'gender' : request.form.get('gender'),
    'email' : request.form.get('emailAddress'),
    'phone_number' : request.form.get('phoneNumber'),
    'location' : request.form.get('phoneNumber'),
    'password' : request.form.get('password'),
    }
    collection = MongoDB('applicant')
    existing_user = collection.find_one({'email': new_record['email']})  
    if existing_user:
      response = {'message': 'exists'}
      return jsonify(response)
    
    result = collection.insert_one(new_record)
    if result.inserted_id:
        session['user_id'] = str(result.inserted_id)
        return jsonify({'message': True})
    else:
        response = {'message': False}
        return jsonify(response)
    
@app.route('/login',methods=['POST'])
def loginpost():
    record = {
    'password' : request.form.get('logpass'),
    'email' : request.form.get('logemail'),
    'type': request.form.get('type'),
    }
    collection_name = 'applicant' if record['type'] == 'applicant' else 'recruiter'
    collection = MongoDB(collection_name)
    existing_user = collection.find_one({'email': record['email']})
    if existing_user:
        if existing_user['password'] == record['password']:
            response = {'success': True}
            session['user_id'] = str(existing_user['_id'])
            print(session['user_id'])
            return jsonify(response)
        else:
            response = {'success': 'password_mismatch'}
            return jsonify(response)
    else :
        response = {'success': False}
        return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
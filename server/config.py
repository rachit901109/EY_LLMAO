from dotenv import load_dotenv
from datetime import timedelta
import os

load_dotenv()

class config():
    # app configuration
    SECRET_KEY = os.environ.get('SECRET_KEY')
    
    # sqlalchemy configurations
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'

    # client session configuration
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=60)
    SESSION_PERMANENT = True
    SESSION_COOKIE_NAME = 'user_session'


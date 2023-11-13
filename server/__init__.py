"""User Auth using server side sessions with sqlalcemy"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_session import Session
from server.config import config

db = SQLAlchemy()
bcrypt = Bcrypt()
sess = Session()

def create_app(config_class = config):
    app = Flask(__name__)

    app.config.from_object(config)

    db.init_app(app)
    app.config['SESSION_SQLALCHEMY'] = db
    bcrypt.init_app(app)
    # sess = Session(app)
    sess.app=app
    # sess.init_app(app)

    from server.users.routes import users

    app.register_blueprint(users)

    return app
from server import db
from datetime import datetime

query_table = db.Table('query_table',
    db.Column('user_id', db.Integer, db.ForeignKey('user.user_id')),
    db.Column('query_id', db.Integer, db.ForeignKey('query.query_id'))
)

completion_table = db.Table('completion_table',
    db.Column('user_id', db.Integer, db.ForeignKey('user.user_id')),
    db.Column('id', db.Integer, db.ForeignKey('completed_topics.id'))
)

class User(db.Model):
    """User of the app."""
    user_id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    user_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    interests = db.Column(db.String(50), nullable=False)
    # profile_pic_name = db.Column(db.String(50), nullable=True)
    # profile_pic = db.Column(db.LargeBinary, nullable=True)
    date_joined = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    queries = db.relationship('Query', secondary='query_table' ,backref='query_by', lazy=True)

    completed_topics = db.relationship('Completed_topics', secondary='completion_table', backref='completed_by', lazy=True)


    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'
    

class Query(db.Model):
    "User Query/Topics"
    query_id = db.Column(db.Integer, primary_key=True)
    query_name = db.Column(db.String(50), nullable=False)
    date_search = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)

    def __repr__(self):
        return f'<Query query_id={self.query_id} user_id={self.user_id} query_name={self.query_name} date_search={self.date_search}>'
    

class Completed_topics(db.Model):
    "Completed Topics by user"
    id = db.Column(db.Integer, primary_key=True)
    topic_name = db.Column(db.String(50), nullable=False)
    level = db.Column(db.String(50), nullable=False)
    module = db.Column(db.String(50), nullable=False)
    date_completed = db.Column(db.DateTime, nullable=True)
    quiz_score = db.Column(db.Integer, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)

    def __repr__(self):
        return f'<Completed_topics id={self.id} user_id={self.user_id} topic_name={self.topic_name} level={self.level} module={self.module} date_completed={self.date_completed} quiz_score={self.quiz_score}>'
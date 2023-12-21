from server import db
from datetime import datetime
from sqlalchemy.ext.associationproxy import association_proxy  # for many-to-many relationship

# query_table = db.Table('query_table',
#     db.Column('user_id', db.Integer, db.ForeignKey('user.user_id')),
#     db.Column('query_id', db.Integer, db.ForeignKey('query.query_id'))
# )

# completion_table = db.Table('completion_table',
#     db.Column('user_id', db.Integer, db.ForeignKey('user.user_id')),
#     db.Column('id', db.Integer, db.ForeignKey('completed_topics.id'))
# )


class Query(db.Model):
    """User Query/Topics"""
    query_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('topic.topic_id'), nullable=False)

    date_search = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    lang = db.Column(db.String(4), nullable=False)

    user = db.relationship('User', backref='user_query_association')
    topic = db.relationship('Topic', backref='topic_query_association')


    def __repr__(self):
        return f'<query_name={self.query_name} user_id={self.user_id} date_search={self.date_search}>'
    

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
    interests = db.Column(db.String(100), nullable=False) #comma separated values
    date_joined = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # queries = db.relationship('Query', secondary='query_table' ,backref='query_by', lazy=True)

    # completed_topics = db.relationship('Completed_topics', secondary='completion_table', backref='completed_by', lazy=True)
    user_query_association = db.relationship('Query', backpopulates='user')
    user_query = association_proxy('user_query_association', 'topic')

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'
    

class Topic(db.Model):
    """Topics in the app."""
    topic_id = db.Column(db.Integer, primary_key=True)
    topic_name = db.Column(db.String(100), nullable=False)

    topic_query_association = db.relationship('Query', backpopulates='topic')
    topic_query = association_proxy('topic_query_association', 'user')

    def __repr__(self):
        return f'topic_name={self.topic_name}'
    

class Module(db.Model):
    """Modules in the app."""
    module_id = db.Column(db.Integer, primary_key=True)
    module_name = db.Column(db.String(100), nullable=False)

    topic_id = db.Column(db.Integer, db.ForeignKey('topic.topic_id'), nullable=False)
    level = db.Column(db.String(50), nullable=False)
    summary = db.Column(db.String(500), nullable=False)
    submodule_content = db.Column(db.JSON, nullable=False)

    # quiz_content = db.Column(db.JSON)

    def __repr__(self):
        return f'<module_name={self.module_name} topic_id={self.topic_id}> level={self.level} summary={self.summary} submodule_content={self.submodule_content}>'
    


    
# class Query(db.Model):
#     "User Query/Topics"
#     query_id = db.Column(db.Integer, primary_key=True)
#     query_name = db.Column(db.String(50), nullable=False)
#     date_search = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)

#     def __repr__(self):
#         return f'<Query query_id={self.query_id} user_id={self.user_id} query_name={self.query_name} date_search={self.date_search}>'
    

# class Completed_topics(db.Model):
#     "Completed Topics by user"
#     id = db.Column(db.Integer, primary_key=True)
#     topic_name = db.Column(db.String(50), nullable=False)
#     level = db.Column(db.String(50), nullable=False)
#     module = db.Column(db.String(50), nullable=False)
#     date_completed = db.Column(db.DateTime, nullable=True)
#     quiz_score = db.Column(db.Integer, nullable=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)

#     def __repr__(self):
#         return f'<Completed_topics id={self.id} user_id={self.user_id} topic_name={self.topic_name} level={self.level} module={self.module} date_completed={self.date_completed} quiz_score={self.quiz_score}>'
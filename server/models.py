from server import db
from datetime import datetime
from sqlalchemy.ext.associationproxy import association_proxy  # for many-to-many relationship


class Query(db.Model):
    """User Query/Topics"""
    query_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('topic.topic_id'), nullable=False)

    date_search = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    lang = db.Column(db.String(4), nullable=False)

    user = db.relationship('User', back_populates='user_query_association')
    topic = db.relationship('Topic', back_populates='topic_query_association')


    def __repr__(self):
        return f'<query_name={self.query_name} user_id={self.user_id} date_search={self.date_search}>'


class CompletedModule(db.Model):
    """Completed Modules by user"""
    cmid = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    module_id = db.Column(db.Integer, db.ForeignKey('module.module_id'), nullable=False)
    level = db.Column(db.String(8), nullable=False)
    date_completed = db.Column(db.DateTime, nullable=True)
    quiz_score = db.Column(db.Integer, nullable=True)
    
    user = db.relationship('User', back_populates='user_module_association')
    module = db.relationship('Module', back_populates='module_comp_association')

    def __repr__(self):
        return f'<module_id={self.module_id} user_id={self.user_id} level={self.level} date_completed={self.date_completed} quiz_score={self.quiz_score}>'
    
   
class CompletedTopics(db.Model):
    """Completed Topics by user"""
    ctid = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('topic.topic_id'), nullable=False)
    date_completed = db.Column(db.DateTime, nullable=True)
    level = db.Column(db.String(8), nullable=False)
    remark = db.Column(db.String(100), nullable=True)
    
    user = db.relationship('User', back_populates='user_topic_association')
    topic = db.relationship('Topic', back_populates='topic_comp_association')

    def __repr__(self):
        return f'<topic_id={self.topic_id} user_id={self.user_id} date_completed={self.date_completed} level={self.level} remark={self.remark}>'


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

    user_query_association = db.relationship('Query', back_populates='user')
    queries = association_proxy('user_query_association', 'topic')
    
    user_module_association = db.relationship('CompletedModule', back_populates='user')
    completed_modules = association_proxy('user_module_association', 'module')

    user_topic_association = db.relationship('CompletedTopics', back_populates='user')
    completed_topics = association_proxy('user_topic_association', 'topic')

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


class Topic(db.Model):
    """Topics in the app."""
    topic_id = db.Column(db.Integer, primary_key=True)
    topic_name = db.Column(db.String(100), nullable=False)

    topic_query_association = db.relationship('Query', back_populates='topic')
    query_by = association_proxy('topic_query_association', 'user')

    topic_comp_association = db.relationship('CompletedTopics', back_populates='topic')
    completed_by = association_proxy('topic_comp_association', 'user')

    def __repr__(self):
        return f'topic_name={self.topic_name}'


class Module(db.Model):
    """Modules in the app."""
    module_id = db.Column(db.Integer, primary_key=True)
    module_name = db.Column(db.String(100), nullable=False)

    topic_id = db.Column(db.Integer, db.ForeignKey('topic.topic_id'), nullable=False)
    level = db.Column(db.String(8), nullable=False)
    summary = db.Column(db.String(500), nullable=False)
    submodule_content = db.Column(db.JSON, nullable=True)

    # quiz_content = db.Column(db.JSON)
    
    module_comp_association = db.relationship('CompletedModule', back_populates='module')
    completed_by = association_proxy('module_comp_association', 'user')

    def __repr__(self):
        return f'<module_name={self.module_name} topic_id={self.topic_id}> level={self.level} summary={self.summary} submodule_content={self.submodule_content}>'
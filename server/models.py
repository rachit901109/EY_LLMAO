from server import db

class User(db.Model):
    """User of the app."""
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(50), nullable=False)


    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'
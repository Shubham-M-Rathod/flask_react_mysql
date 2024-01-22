from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    username = db.Column(db.String(80), primary_key=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(255), nullable=False)

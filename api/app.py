from flask import Flask
from controller.User import api
from model.User import db
from flask_jwt_extended import JWTManager
import datetime

from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:R123@localhost/aiml'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_SECRET_KEY'] = '3000'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
app.config['JWT_COOKIE_CSRF_PROTECT'] = False ## comment this line later , set CSRF protection
jwt = JWTManager(app)

api.init_app(app)
db.init_app(app)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
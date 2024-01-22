from flask_restx import Api, Resource, reqparse
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from model.User import db, User
from flask import jsonify, request
api = Api()

BLACKLIST = set()

@api.route('/signup')
class Signup(Resource):
    user_parser = reqparse.RequestParser()
    user_parser.add_argument('username', type=str, required=True)
    user_parser.add_argument('password', type=str, required=True)
    user_parser.add_argument('email', type=str, required=True)

    @api.expect(user_parser, validate=True)
    def post(self):
        data = self.user_parser.parse_args()
        username = data['username']
        password = data['password']
        email = data['email']
        new_user = User(username=username, password=password, email=email)
        access_token = create_access_token(identity=username)
        try:
            db.session.add(new_user)
            db.session.commit()
            response = jsonify({'user': username, 'access_token':access_token})
            return response
        except Exception as e:
            print(e)
    
@api.route('/login')
class Login(Resource):

    login_parser = reqparse.RequestParser()
    login_parser.add_argument('username', type=str, required=True)
    login_parser.add_argument('password', type=str, required=True)

    @api.expect(login_parser, validate=True)
    def post(self):
        data = self.login_parser.parse_args()
        username = data['username']
        password = data['password']
        user = db.session.query(User).filter_by(username=username).first()
        if user :
            if user.password == password:
                access_token = create_access_token(identity=username)
                response = jsonify({'user': username, 'access_token':access_token})
                return response
            else:
                return "Wrong pass", 400
        return "No user", 400

@api.route('/logout')
class Logout(Resource):
    @jwt_required()
    def get(self):
        try:
            jti = get_jwt()['jti']
            BLACKLIST.add(jti)
            resp = jsonify({'logout': True})
            return resp   
        except Exception as e:
            return "No access", 400 

@api.route('/users')
class Users(Resource):

    user_parser = reqparse.RequestParser()
    user_parser.add_argument('username', type=str, required=True)
    user_parser.add_argument('new_username', type=str)
    user_parser.add_argument('new_email', type=str)

    @jwt_required()
    def get(self):
        try:
            jti = get_jwt()['jti']
            if jti in BLACKLIST:
                return "No access", 400
            users = db.session.query(User).all()
            return [{'user':user.username, 'email':user.email} for user in users]
        except Exception as e:
            return "No access", 400
    
    @api.expect(user_parser, validate=True)
    @jwt_required()
    def patch(self):
        try:
            jti = get_jwt()['jti']
            if jti in BLACKLIST:
                return "No access", 400
            data = self.user_parser.parse_args()
            username = data['username']
            new_username = data['new_username']
            new_email = data['new_email']

            user = User.query.filter_by(username=username).first()
            if user :
                if new_username:
                    user.username = new_username
                if new_email:
                    user.email = new_email
                db.session.commit()
                return {'user':user.username, 'email':user.email}
            return "No user", 400
        except Exception as e:
            return "Exception", 400
    
@api.route('/userprofile')
class UserSingle(Resource):

    user_parser = reqparse.RequestParser()
    user_parser.add_argument('username', type=str, required=True)

    @api.expect(user_parser, validate=True)
    @jwt_required()
    def get(self):
        # return 200
        try:
            data = self.user_parser.parse_args()
            username = data['username']
            jti = get_jwt()['jti']
            if jti in BLACKLIST:
                return "No access", 400
            user = db.session.query(User).filter_by(username=username).first()
            if user:
                return {'user': user.username, 'email': user.email}
        except Exception as e:
            return "No access", 400

    
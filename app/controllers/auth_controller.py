from flask import request, g, Blueprint, Response, session
from flask_login import LoginManager, login_user, logout_user, current_user, login_required

# Import the database object (db) from the main application module
# and the app object to initialize the flask_login manager
from app import app, db
# Import module models (i.e. User)
from app.models.auth_model import User
from app.models.comments_model import Comment
from app.models.caption_model import Caption
from app.models.owned_photos_model import OwnedPhoto
from app.models.photos_model import Photo
import json
# Define the blueprint: 'auth', set its url prefix: app.url/auth
auth_module = Blueprint('auth', __name__, url_prefix='/auth')

# Initialize flask_login's manager
login_manager = LoginManager()
login_manager.init_app(app)


@auth_module.route('/get-owned-photos')
@login_required
def get_owned_photos():
    app.logger.info(current_user)
    ids = OwnedPhoto.query.filter_by(user_id=current_user.id).all()
    if ids is None:
        return Response("No owned Photos", status=404, mimetype='application/text')

    results = list(map(merge, ids))


    photos = Photo.query.filter(Photo.id.in_(list(map(lambda o: o.photo_id, ids)))).all()


    photos_objects = list(map(Photo.to_map, photos))
    return Response(json.dumps(results), status=200, mimetype='application/json')


def merge(owned_photo):
    caption = Caption.query.filter_by(owned_photo_id=owned_photo.id).first()
    caption_dict = caption.to_map()
    caption_dict["caption"] = caption.text
    del caption_dict["text"]
    owned_dict = owned_photo.to_map()
    owned_dict.update(caption_dict)
    comments = Comment.query.filter_by(owned_photo_id=owned_photo.id).order_by(Comment.comment_date).all()
    comments = list(map(Comment.to_map, comments))
    comments_dict = {"comments": json.dumps(comments)}
    owned_dict.update(comments_dict)
    photo = Photo.query.filter_by(id=owned_photo.photo_id).first().to_map()
    owned_dict.update(photo)
    return owned_dict


@auth_module.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data["email"]
    password = data["password"]
    registered_user = User.query.filter_by(email=email).first()
    curr = current_user
    app.logger.info('Current User: ' + str(curr))
    if registered_user is None or registered_user.password != password: #and bcrypt.check_password_hash(registered_user.password, password):
        message = 'Username or Password is invalid'
        app.logger.error('POST /auth/login HTTP/1.1 401 Unauthorized - ' + message)
        resp = Response(message, status=401, mimetype='application/text')
        return resp
    login_user(registered_user)
    user = User(registered_user.first, registered_user.last, registered_user.username, registered_user.email, None)
    user.id = registered_user.id
    app.logger.info('User: ' + str(user))
    app.logger.info('Current User1: ' + str(current_user))
    return Response(json.dumps(user.to_map()), status=200, mimetype='application/json')


@auth_module.route('/logout')
@login_required
def logout():
    app.logger.info('logout Current User: ' + str(current_user.id))
    logout_user()
    session['user'] = None
    session.modified = True
    app.logger.info('logged out Current User: ' + str(current_user))
    return Response("Logging out...", status=200, mimetype='application/text')


@auth_module.route('/register', methods=['POST'])
def register():
    req = request
    user = User(request.json['first'], request.json['last'], request.json['username'], request.json['email'], request.json['password'])
    username_result = User.query.filter_by(username=request.json['username']).first()
    email_result = User.query.filter_by(email=request.json['email']).first()

    if username_result is None and email_result is None:
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return Response(json.dumps(user.to_map()), status=200, mimetype='application/json')
    else:
        if username_result != request.json['username']:
            message = 'Email already exists'
        else:
            message = 'Username already exists'
        return Response(message, status=409, mimetype='application/text')


@auth_module.route('/is-logged-in')
def is_logged_in():
    if current_user.is_authenticated:
        return Response(json.dumps(current_user.to_map()), status=200, mimetype='application/json')
    return Response("Not logged in.", status=401, mimetype='application/text')

@auth_module.before_request
def before_request():
    g.user = current_user


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))



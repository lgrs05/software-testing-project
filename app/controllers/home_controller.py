import json
import boto3, botocore
from flask import request, g, Blueprint, Response, session
from flask_login import current_user, login_required
import os
from PIL import Image

# Import the database object (db) from the main application module
# and the app object to initialize the flask_login manager
from app import app, db
# Import module models (i.e. User)
from app.models.comments_model import Comment
from app.models.auth_model import User
from app.models.caption_model import Caption
from app.models.photos_model import Photo
from app.models.owned_photos_model import OwnedPhoto
from app.models.shared_photos_model import SharedPhoto
import datetime

# Define the blueprint: 'home', set its url prefix: app.url/home
home_module = Blueprint('home', __name__, url_prefix='/home')


def merge(owned_photo):
    caption = Caption.query.filter_by(owned_photo_id=owned_photo.id).first()
    caption_dict = caption.to_map()
    caption_dict["caption"] = caption.text
    del caption_dict["text"]
    owned_dict = owned_photo.to_map()
    owned_dict.update(caption_dict)
    comments = Comment.query.filter_by(owned_photo_id=owned_photo.id).order_by(Comment.comment_date).all()
    comments = list(map(Comment.to_map, comments))
    comments_dict = {"comments": comments}
    owned_dict.update(comments_dict)
    photo = Photo.query.filter_by(id=owned_photo.photo_id).first().to_map()
    owned_dict.update(photo)
    return owned_dict


@home_module.route('/add-photo', methods=['POST'])
def add_photo():
    file = request.files['src']
    caption_text = request.form["caption"] + ' | Uploaded By ' + current_user.username
    img = Image.open(file)
    width, height = img.size

    now = datetime.datetime.now()
    photo = Photo(src='', upload_date=now,
                  uploader_id=current_user.id, width=width, height=height)

    db.session.add(photo)
    db.session.commit()
    filename = str(photo.id) + '.' + file.filename.rsplit('.', 1)[1].lower()

    photo.src = 'https://s3.amazonaws.com/software-testing-app/'+ filename

    owned_photo = OwnedPhoto(user_id=current_user.id, photo_id=photo.id)

    db.session.add(owned_photo)
    db.session.commit()

    caption = Caption(owned_photo_id=owned_photo.id, text=caption_text)

    db.session.add(caption)
    db.session.commit()

    pathloc = filename
    img.save(filename)

    try:
        s = boto3.resource('s3')

        with open(filename, 'rb') as dta:
            s.Bucket('software-testing-app').put_object(Key=filename, Body=dta, ContentType=file.content_type,
                                                        ACL='public-read')

    except Exception as e:
        app.logger.error(e)

    # delete the file
    os.unlink(pathloc)

    return Response("Done", status=200, mimetype='application/text')


@home_module.route('/delete-photo', methods=['POST'])
def delete_photo():
    data = request.json
    photo_id = data["id"]

    owned_photo = OwnedPhoto.query.filter_by(photo_id=photo_id, user_id=current_user.id).first()
    comment = Comment.query.filter_by(owned_photo_id=owned_photo.id).all()
    if comment:
        Comment.query.filter_by(owned_photo_id=owned_photo.id).delete(synchronize_session=False)
    Caption.query.filter_by(owned_photo_id=owned_photo.id).delete(synchronize_session=False)
    to_map = owned_photo.to_map()
    shared_photo = SharedPhoto.query.filter_by(is_added=owned_photo.id).first()
    if shared_photo:
        shared_photo.is_added = -1

    shared_photo = SharedPhoto.query.filter_by(owned_photo_id=owned_photo.id).first()
    if shared_photo:
        SharedPhoto.query.filter_by(owned_photo_id=owned_photo.id).delete(synchronize_session=False)

    db.session.delete(owned_photo)

    photo_to_unlink = Photo.query.filter(Photo.id == photo_id, Photo.uploader_id == current_user.id).first()
    if photo_to_unlink:
        photo_to_unlink.uploader_id = -1

    db.session.commit()
    message = "Removed Owned Photo: " + json.dumps(to_map)
    return Response(message, status=200, mimetype='application/text')


@home_module.route('/share-photo', methods=['POST'])
def share_photo():
    data = request.json
    photo_id = data["photo_id"]
    username = data["username"]
    user = User.query.filter_by(username=username).first()
    if user is None:
        return Response('There is no user with that username', status=200, mimetype='application/text')
    owned_photo = OwnedPhoto.query.filter_by(id=photo_id).first()
    shared_photo = SharedPhoto(user_id=user.id, owned_photo_id=owned_photo.id, is_added=-1)
    db.session.add(shared_photo)
    db.session.commit()
    return Response('Shared Successfully', status=200, mimetype='application/text')


@home_module.route('/search-user/<string:username>')
def search_user(username):
    users = User.query.filter(User.username.contains(username)).all()
    if users:
        users = list(map((lambda u: {"id": u.id, "label": u.username}), users))
        return Response(json.dumps(users), status=200, mimetype='application/json')
    return Response(json.dumps([]), status=200, mimetype='application/json')


@home_module.route('/search-by-caption/<string:text>')
@home_module.route('/search-by-caption/')
@home_module.route('/get-owned-photos')
def search_by_caption(text=''):
    ids = OwnedPhoto.query.filter_by(user_id=current_user.id).all()
    if ids:
        if text == '':
            results = list(map(merge, ids))
        else:
            ids = Caption.query.filter(Caption.owned_photo_id.in_(list(map(lambda o: o.id, ids)))).filter(Caption.text.contains(text)).all()
            ids = OwnedPhoto.query.filter(OwnedPhoto.id.in_(list(map(lambda o: o.owned_photo_id, ids)))).all()
            results = list(map(merge, ids))

        return Response(json.dumps(results), status=200, mimetype='application/json')
    else:
        return Response(json.dumps([]), status=200, mimetype='application/json')



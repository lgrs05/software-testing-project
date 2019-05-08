from flask import request, Blueprint, Response
from flask_login import current_user
from app.models.owned_photos_model import OwnedPhoto
from app.models.caption_model import Caption
from app.models.comments_model import Comment
import re
import csv
# Import the database object (db) from the main application module
# and the app object to initialize the flask_login manager
from app import app, db
# Import module models (i.e. User)
from app.models.photos_model import Photo
from app.models.shared_photos_model import SharedPhoto
import sqlite3
import json
from datetime import datetime

# from pyspark import SparkConf, SparkContext
# from pyspark.sql import SparkSession, Row


# Define the blueprint: 'home', set its url prefix: app.url/home
shared_with_me_module = Blueprint('shared_with_me', __name__, url_prefix='/shared_with_me')

# TODO all requests regarding shared with me page


# def to_photo_with_owner(shared_photo):
#     owned = OwnedPhoto.query.filter_by(id=shared_photo.owned_photo_id).first()
#     photo = Photo.query.filter_by(id=owned.photo_id).first()
#     with_id = {"id" : photo.id, "src" :photo.src, "" }

@shared_with_me_module.route('/get-shared')
def get_shared():
    shared_photos = SharedPhoto.query.filter_by(user_id=current_user.id).all()
    if shared_photos:
        merge(shared_photos[0])
        # owned_ids = list(map(lambda shared: shared.owned_photo_id, shared_photos))
        # owned_photos = OwnedPhoto.query.filter(OwnedPhoto.id.in_(owned_ids)).all()
        # photos_ids = list(map(lambda owned: owned.photo_id, owned_photos))
        # photos = Photo.query.filter(Photo.id.in_(photos_ids)).all()
        result = list(map(merge, shared_photos))
        return Response(json.dumps(result), status=200, mimetype='application/json')
    return Response("There are no shared photos with you.", status=404, mimetype='application/text')


def merge(shared_photo):
    shared_photo_dict = shared_photo.to_map()
    shared_photo_dict["shared_id"] = shared_photo.id
    shared_photo_dict["shared_with_id"] = shared_photo.user_id
    del shared_photo_dict["user_id"]
    del shared_photo_dict["id"]
    owned_photo = OwnedPhoto.query.filter_by(id=shared_photo.owned_photo_id).first()
    owned_photo_dict = owned_photo.to_map()
    owned_photo_dict["owner_id"] = owned_photo.user_id
    del owned_photo_dict["user_id"]
    del owned_photo_dict["id"]
    shared_photo_dict.update(owned_photo_dict)
    caption = Caption.query.filter_by(owned_photo_id=owned_photo.id).first()
    caption_dict = caption.to_map()
    caption_dict["caption_id"] = caption.id
    caption_dict["caption"] = caption.text
    del caption_dict["id"]
    del caption_dict["owned_photo_id"]
    del caption_dict["text"]
    shared_photo_dict.update(caption_dict)
    comments = Comment.query.filter_by(owned_photo_id=owned_photo.id).order_by(Comment.comment_date).all()
    comments = list(map(Comment.to_map, comments))
    comments_dict = {"comments": json.dumps(comments)}
    shared_photo_dict.update(comments_dict)
    photo = Photo.query.filter_by(id=owned_photo.photo_id).first()
    photo_dict = photo.to_map()
    shared_photo_dict.update(photo_dict)
    return shared_photo_dict


@shared_with_me_module.route('/add-to-home', methods=['POST'])
def add_to_home():
    data = request.json
    photo_id = data["photo_id"]
    shared_id = data["shared_id"]

    owned_photo = OwnedPhoto(user_id=current_user.id, photo_id=photo_id)

    db.session.add(owned_photo)
    db.session.commit()

    shared_photo = SharedPhoto.query.filter_by(id=shared_id).first()

    original_caption = Caption.query.with_entities(Caption.text)\
        .filter_by(owned_photo_id=shared_photo.owned_photo_id).first()[0]

    author = re.search('\s\|.+', original_caption).group()

    caption = Caption(owned_photo_id=owned_photo.id, text=author)
    shared_photo.is_added = owned_photo.id

    db.session.add(caption)
    db.session.commit()

    return Response(json.dumps(owned_photo.to_map()), status=200, mimetype='application/json')




import re

from flask import request, g, Blueprint, Response
from flask_login import LoginManager, login_user, logout_user, current_user

# Import the database object (db) from the main application module
# and the app object to initialize the flask_login manager
from app import app, db
# Import module models (i.e. User)
from app.models.caption_model import Caption

# Define the blueprint: 'auth', set its url prefix: app.url/auth
caption_module = Blueprint('caption', __name__, url_prefix='/caption')

# TODO all requests regarding captions

@caption_module.route('/get-text/<int:id>', methods=['GET'])
def gettext(id):
    caption = Caption.query.filter_by(owned_photo_id=id).first()
    if caption:
        return Response(caption.get_text(), status=200, mimetype="application/json")
    message = "There is no photo for this id in the DB"
    app.logger.error("GET /caption/get-text HTTP/1.1 404 Not Found - " + message)
    return Response(message, status=404, mimetype="application/json")


@caption_module.route('/change-text', methods=['POST'])
def changetext():
    data = request.json
    id = data["id"]
    newtext = data["newtext"]
    caption = Caption.query.filter_by(owned_photo_id=id).first()
    if caption:
        uploader = re.search('\s\|.+', caption.text).group()
        caption.text = newtext + uploader
        db.session.commit()
        return Response(caption.get_text(), status=200, mimetype="application/json")
    message = "There is no photo for this id in the DB"
    app.logger.error("GET /caption/change-text HTTP/1.1 404 Not Found - " + message)
    return Response(message, status=404, mimetype="application/json")

@caption_module.route('/add-text', methods=['POST'])
def addtext():
    data = request.json
    id = data["id"]
    newtext = data["newtext"]
    caption = Caption(owned_photo_id=id, text=newtext)
    db.session.add(caption)
    db.session.commit()
    return Response("Caption added successfully", status=200, mimetype="application/json")
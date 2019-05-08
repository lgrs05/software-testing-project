from flask import Flask, request, g, Blueprint, Response
from flask_login import LoginManager, login_user, logout_user, current_user
import json
import datetime

# Import the database object (db) from the main application module
# and the app object to initialize the flask_login manager
from app import app, db
# Import module models (i.e. User)
from app.models.comments_model import Comment
from app.models.auth_model import User

# Define the blueprint: 'auth', set its url prefix: app.url/auth
comments_module = Blueprint('comments', __name__, url_prefix='/comments')


# TODO all requests regarding comments


@comments_module.route('/get-comments/<int:id>')
def getcomments(id):
    comments = Comment.query.filter_by(owned_photo_id=id).order_by(Comment.comment_date).all()

    if comments:
        comments = list(map(merge, comments))
        app.logger.info("# of Comments: " + str(len(comments)))
        return Response(json.dumps(comments), status=200, mimetype="application/json")
    message = "There are no comments"
    app.logger.error("GET /comments/get-comments HTTP/1.1 404 Not Found - " + message)
    return Response(json.dumps([]), status=200, mimetype='application/json')


def merge(comment):
    comment_dict = comment.to_map()
    user = User.query.filter_by(id=comment_dict["author_id"]).first()
    comment_dict["name"] = user.first + ' ' + user.last
    comment_dict["time"] = str(comment.comment_date.year) + '-' + str(comment.comment_date.month) + '-' \
                           + str(comment.comment_date.day) + ' ' + str(comment.comment_date.hour) + ':' \
                           + str(comment.comment_date.minute) + ':' + str(comment.comment_date.second)
    comment_dict["message"] = comment.text
    del comment_dict["text"]
    del comment_dict["comment_date"]
    return comment_dict


@comments_module.route('/post', methods=['POST'])
def post():
    data = request.json
    photo_id = data["id"]
    text = data["message"]
    comment = Comment(owned_photo_id=photo_id, text=text, author_id=current_user.id, comment_date=datetime.datetime.now())
    db.session.add(comment)
    db.session.commit()
    comments = Comment.query.filter_by(owned_photo_id=photo_id).order_by(Comment.comment_date).all()

    comments = list(map(merge, comments))
    return Response(json.dumps(comments), status=200, mimetype="application/json")

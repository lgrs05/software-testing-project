from app import db
from app.models.base import Base
import json


class Comment(Base):
    __tablename__ = "comments"
    owned_photo_id = db.Column('owned_photo_id', db.Integer, db.ForeignKey('owned_photos.id'), nullable=False)
    text = db.Column('text', db.String(255), nullable=False)
    author_id = db.Column('author_id', db.Integer, db.ForeignKey('users.id'), nullable=False)
    comment_date = db.Column('comment_date', db.DateTime, nullable=False)

    def __init__(self, owned_photo_id, text, author_id, comment_date):
        self.owned_photo_id = owned_photo_id
        self.comment_date = comment_date
        self.text = text
        self.author_id = author_id

    def get_owned_photo_id(self):
        return self.owned_photo_id

    def get_comment_date(self):
        return self.comment_date

    def get_text(self):
        return self.text

    def get_author_id(self):
        return self.author_id

    def get_id(self):
        return self.id

    def to_map(self):
        return {"id": self.id, "owned_photo_id": self.owned_photo_id, "comment_date": str(self.comment_date),
                "text": self.text, "author_id": self.author_id}

    def get_fields(self):
        return \
            '{' + '"id": "{0}" , "owned_photo_id": "{1}" , "comment_date " : "{2}" , "text" : "{3}" , "author_id" : "{4}"'\
            .format(self.id, self.owned_photo_id, self.comment_date, self.text, self.author_id) + '}'

    def __repr__(self):
        return json.dumps({"id": self.id, "owned_photo_id": self.owned_photo_id, "comment_date": str(self.comment_date),
                           "text": self.text, "author_id": self.author_id})

from app import db
from app.models.base import Base
import json


class SharedPhoto(Base):
    __tablename__ = "shared_photos"
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False)
    owned_photo_id = db.Column('owned_photo_id', db.Integer, db.ForeignKey('owned_photos.id'), nullable=False)
    is_added = db.Column('is_added', db.Integer, nullable=False)

    def __init__(self, user_id, owned_photo_id, is_added):
        self.user_id = user_id
        self.owned_photo_id = owned_photo_id
        self.is_added = is_added

    def get_user_id(self):
        return self.user_id

    def get_is_added(self):
        return  self.is_added

    def get_photo_id(self):
        return self.owned_photo_id

    def get_id(self):
        return self.id

    def to_map(self):
        return {"id": self.id, "user_id": self.user_id, "owned_photo_id" : self.owned_photo_id,
                "is_added": self.is_added}

    def get_fields(self):
        return \
            '{' + '"id": "{0}" , "user_id": "{1}" , "owned_photo_id" : "{2}", "is_added" : {3}'\
            .format(self.id, self.user_id, self.owned_photo_id, self.is_added) + '}'

    def __repr__(self):
        return json.dumps({"id": self.id, "user_id": self.user_id, "owned_photo_id" : self.owned_photo_id,
                           "is_added": self.is_added})

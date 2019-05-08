from app import db
from app.models.base import Base
import json


class OwnedPhoto(Base):
    __tablename__ = "owned_photos"
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False, )
    photo_id = db.Column('photo_id', db.Integer, db.ForeignKey('photos.id'), nullable=False)

    def __init__(self, user_id, photo_id):
        self.user_id = user_id
        self.photo_id = photo_id

    def get_user_id(self):
        return self.user_id

    def get_photo_id(self):
        return self.photo_id

    def get_id(self):
        return self.id

    def get_fields(self):
        return \
            '{\n' + '"id": "{0}",\n "user_id": "{1}",\n "photo_id" : "{2}"\n'\
            .format(self.id, self.user_id, self.photo_id) + '}'

    def to_map(self):
        return {"id": self.id, "user_id": self.user_id, "photo_id": self.photo_id}

    def __repr__(self):
        return json.dumps({"id": self.id, "user_id": self.user_id, "photo_id": self.photo_id})

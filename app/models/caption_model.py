from app import db
from app.models.base import Base


class Caption(Base):
    __tablename__ = "captions"
    owned_photo_id = db.Column('owned_photo_id', db.Integer, db.ForeignKey('owned_photos.id'), nullable=False)
    text = db.Column('text', db.String(255), nullable=False)

    def __init__(self, owned_photo_id, text):
        self.owned_photo_id = owned_photo_id
        self.text = text

    def get_owned_photo_id(self):
        return self.owned_photo_id

    def get_text(self):
        return self.text

    def get_id(self):
        return self.id

    def to_map(self):
        return {"id": self.id, "owned_photo_id": self.owned_photo_id, "text": self.text}

    def get_fields(self):
        return \
            '{' + '"id": "{0}" , "owned_photo_id": "{1}" , "text" : "{2}"'\
            .format(self.id, self.owned_photo_id, self.text) + '}'

    def __repr__(self):
        return '<Caption %r>' % self.id

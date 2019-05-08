from app import db
from app.models.base import Base


class Photo(Base):
    __tablename__ = "photos"
    src = db.Column('src', db.String(300), nullable=False)
    uploader_id = db.Column('uploader_id', db.Integer, nullable=False)
    height = db.Column('height', db.Integer, nullable=False)
    width = db.Column('width', db.Integer, nullable=False)
    upload_date = db.Column('upload_date', db.Date, nullable=False)

    def __init__(self, src, uploader_id, height, width, upload_date):
        self.src = src
        self.uploader_id = uploader_id
        self.upload_date = upload_date
        self.height = height
        self.width = width

    def get_src(self):
        return self.src

    def get_uploader_id(self):
        return self.uploader_id

    def get_upload_date(self):
        return self.upload_date

    def get_height(self):
        return self.height

    def get_width(self):
        return self.width

    def get_id(self):
        return self.id

    def to_map(self):
        obj = {"id": self.id, "src": self.src, "uploader_id": self.uploader_id, "upload_date": str(self.upload_date),
               "height": self.height, "width": self.width}
        return obj

    def get_fields(self):
        return \
            '{{ "id" : "{0}", "src" : "{1}", "uploader_id" : "{2}", "upload_date " : "{3}", "height" : "{4}", ' \
            '"width" : "{5}"}} '.format(self.id, self.src, self.uploader_id, self.upload_date, self.height, self.width)

    def __repr__(self):
        return \
            '{{ "id" : "{0}", "src" : "{1}", "uploader_id" : "{2}", "upload_date " : "{3}", "height" : "{4}", ' \
            '"width" : "{5}"}} '.format(self.id, self.src, self.uploader_id, self.upload_date, self.height, self.width)

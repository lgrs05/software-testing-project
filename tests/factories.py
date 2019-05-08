import factory
import factory.faker
import datetime as dt
import factory.fuzzy
from factory.alchemy import SQLAlchemyModelFactory
from app import db
from app.models import auth_model
from app.models import photos_model
from app.models import owned_photos_model
from app.models import caption_model
from app.models import comments_model
from app.models import shared_photos_model


class UserFactory(SQLAlchemyModelFactory):
    class Meta:
        model = auth_model
        sqlalchemy_session = db.session

    first_name = factory.faker.Faker('name')
    last_name = factory.faker.Faker('name')
    email = factory.faker.Faker('test@email.com')
    username = factory.faker.Faker('username')


class PhotoFactory(SQLAlchemyModelFactory):
    class Meta:
        model = photos_model
        sqlalchemy_session = db.session

    src = factory.fuzzy.FuzzyText(length=300)
    height = factory.fuzzy.FuzzyInteger(low=1)
    width = factory.fuzzy.FuzzyInteger(low=1)
    uploader_id = factory.fuzzy.FuzzyInteger(low=1)


class OwnedPhotoFactory(SQLAlchemyModelFactory):
    class Meta:
        model = owned_photos_model
        sqlalchemy_session = db.session

    user_id = factory.fuzzy.FuzzyInteger(low=1)
    photo_id = factory.fuzzy.FuzzyInteger(low=1)


class CaptionFactory(SQLAlchemyModelFactory):
    class Meta:
        model = caption_model
        sqlalchemy_session = db.session

    text = factory.fuzzy.FuzzyText(length=300)
    owned_photo_id = factory.fuzzy.FuzzyInteger(low=1)


class CommentFactory(SQLAlchemyModelFactory):
    class Meta:
        model = comments_model
        sqlalchemy_session = db.session

    id = factory.fuzzy.FuzzyInteger(low=2)
    text = factory.fuzzy.FuzzyText(length=300)
    owned_photo_id = factory.fuzzy.FuzzyInteger(low=1)
    author_id = factory.fuzzy.FuzzyInteger(low=1)
    comment_date = factory.fuzzy.FuzzyDateTime(start_dt=dt.datetime.now(dt.timezone.utc))


class SharePhotoFactory(SQLAlchemyModelFactory):
    class Meta:
        model = shared_photos_model
        sqlalchemy_session = db.session

    owned_photo_id = factory.fuzzy.FuzzyInteger(low=1)
    user_id = factory.fuzzy.FuzzyInteger(low=1)
    is_added = factory.fuzzy.FuzzyInteger(low=-1)

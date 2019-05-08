import os
import json


# Statement for enabling the development environment
DEBUG = True
ASSETS_DEBUG = True
TESTING = True

# Define the application directory
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

db_cred = json.load(open('.aws/dbCredentials.json'))

# Define the database - we are working with
# SQLite for this example
SQLALCHEMY_DATABASE_URI = 'postgresql://'+db_cred['user']+':'+db_cred['password']+'@testing.clleaqmpabgb.us-east-1.rds.amazonaws.com:5432/app'
#For Testing
#SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:password@localhost:5433/app_test'
SQLALCHEMY_TRACK_MODIFICATIONS = False
DATABASE_CONNECT_OPTIONS = {}

S3_BUCKET = os.environ.get("S3_BUCKET_NAME")
S3_KEY = os.environ.get("S3_ACCESS_KEY")
S3_SECRET = os.environ.get("S3_SECRET_ACCESS_KEY")
S3_LOCATION = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET)

# Enable protection against *Cross-site Request Forgery (CSRF)*
CSRF_ENABLED = True

# Use a secure, unique and absolutely secret key for
# signing the data.
CSRF_SESSION_KEY = "secret"

# Secret key for signing cookies
SECRET_KEY = "secret"

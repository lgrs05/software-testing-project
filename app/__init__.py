from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_assets import Environment, Bundle


# Flask Init
app = Flask(__name__, template_folder="../client/build/",
            static_folder="../client/build/static")  # create the application instance :)
app.config.from_pyfile('config.py')

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)

# Flask-Assets Bundle Registration
assets = Environment(app)


@app.route('/')
@app.route('/home')
@app.route('/shared-with-me')
@app.route('/about')
@app.route('/register')
@app.route('/login')
@app.route('/profile')
def home():
    return render_template('index.html')


# Import modules using its blueprint handler variable
#from app.controllers.auth_controller import auth_module
# from app.controllers.comments_controller import comments_module
# from app.controllers.caption_controller import caption_module
# from app.controllers.home_controller import home_module
# from app.controllers.shared_with_me_controller import shared_with_me_module
from .controllers import comments_controller as com_c
from .controllers import caption_controller as cap_c
from .controllers import home_controller as h_c
from .controllers import auth_controller as a_c
from .controllers import shared_with_me_controller as s_c




# Register auth Blueprint
app.register_blueprint(h_c.home_module)
app.register_blueprint(a_c.auth_module)
app.register_blueprint(com_c.comments_module)
app.register_blueprint(cap_c.caption_module)
app.register_blueprint(s_c.shared_with_me_module)

# Create DB Schema
db.create_all()


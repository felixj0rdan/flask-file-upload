from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager
from db import db
from flask_cors import CORS

from resources.upload import UploadFile, getFile

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'D:\projects\flask-file-upload\backend\fileFolder'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///data.db"

api = Api(app)

@app.before_first_request
def create_tables():
    db.create_all()

api.add_resource(UploadFile, '/upload')
api.add_resource(getFile, '/get/<path:path>')

db.init_app(app)

if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(port=5000, debug=True)
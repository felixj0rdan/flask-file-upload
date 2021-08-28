import os
import re
import json
import random as rand
from flask import request ,jsonify, send_file,send_from_directory
from flask_restful import Resource, reqparse
from werkzeug.utils import secure_filename
from models.upload import fileModel

# UPLOAD_FOLDER = "D:\projects\flask-file-upload\backend\fileFolder"
# UPLOAD_FOLDER = 'backend\uploadFolder'
UPLOAD_FOLDER = 'D:/projects/flask-file-upload/backend/ploadFolder'
url = 'http://127.0.0.1:5000/'

class UploadFile(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('filename',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('fileURL',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    def post(self):
        print(request.files)
        if 'file' not in request.files:
            return {'message': 'No file uploaded!'}, 404
        
        files = request.files.getlist('file')
        errors = {}
        success = False
        # value = rand.randint(0000, 9999)
        for file in files:
            if file:
                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))
                fileURL = url + filename
                print(fileURL)
                FILE = fileModel(filename, fileURL)
                FILE.save_to_db()

                success = True

                return {'message': 'success'}

            else:
                return {'message': 'error'}
            
class getFile(Resource):
    def get(self, path):
        print (path)
        try:
            return send_from_directory(UPLOAD_FOLDER, path=path, as_attachment=True)
        except FileNotFoundError:
            return {'message':'File not Found'},404
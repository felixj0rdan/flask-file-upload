from db import db
import datetime
import requests


class fileModel(db.Model):
    __tablename__ = 'Files'

    id = db.Column(db.Integer, primary_key = True)
    filename = db.Column(db.String())
    fileURL = db.Column(db.String())

    def __init__(self, filename, fileURL):
        self.filename = filename
        self.fileURL = fileURL

    def json(self):
        return {
            'id': self.id,
            'filename': self.filename,
            'fileURL': self.fileURL
        }
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_all(cls):
        return cls.query.all()
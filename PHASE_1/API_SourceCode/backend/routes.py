from server import app
from flask import Flask
from flask_restplus import Resource, Api

app = Flask(__name__)
api = Api(app)

@api.route('/hello')
class hello(Resource):
    def get(self):
        return {'hello': 'world'}
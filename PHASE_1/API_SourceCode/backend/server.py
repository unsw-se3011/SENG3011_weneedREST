from flask import Flask
from flask_restplus import Api

app = Flask(__name__)
api = Api(app)
api.secret_key = 'we_need_REST'
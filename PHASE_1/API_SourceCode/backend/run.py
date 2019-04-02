from routes import api, app 
from flask import Flask
from flask_restplus import Resource, Api

api.secret_key = 'we_need_REST'

if __name__ == '__main__':
    app.run(debug=True, port=8080)
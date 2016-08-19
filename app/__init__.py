from flask import Flask
from flask_pymongo import PyMongo
from flask_restful import Api, Resource

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://root:toor@ds161485.mlab.com:61485/todos_db'
app.config['SECRET_KEY'] = 'pass'
app.config['MONGO_DBNAME'] = 'todos_db'

mongo = PyMongo(app)

from app import views
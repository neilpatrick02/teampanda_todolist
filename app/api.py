from flask import render_template, jsonify, abort
from bson.objectid import ObjectId
from app import app, mongo


def get_tasks():
	tasks = mongo.db.todos
	output = []
	for i in tasks.find():
		output.append({'_id':str(i['_id']), 'task': i['task'],'due_date': i['due_date']})
	sort_output = sorted(output, key=lambda k:['due_date'])
	
	return sort_output

def add_task(data):
	tasks = mongo.db.todos
	tasks.insert_one(data)

def edit_task(tID, data):	
	mongo.db.todos.update_one({'_id': ObjectId(tID)}, {"$set":data});


def del_task(tID):
	mongo.db.todos.delete_one({'_id': ObjectId(tID)})
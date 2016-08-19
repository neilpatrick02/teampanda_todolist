from flask import render_template, jsonify, request
from app import app, mongo, api


@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html')

@app.route('/pandatodo/api/tasks')
def getTasks():
	return jsonify(result = api.get_tasks())

@app.route('/pandatodo/api/add')
def addTask():
	tasks = mongo.db.todos
	task = str(request.args.get('task'))
	due_date = request.args.get('due_date')
	data = {"task": task, "due_date" : due_date}
	api.add_task(data)
	
	return jsonify(result = api.get_tasks())

@app.route('/pandatodo/api/edit')
def editTask():
	tID = request.args.get('_id')
	task = request.args.get('task')
	due_date = request.args.get('due_date')
	data = {"task": task, "due_date" : due_date}
	api.edit_task(tID,data)

	return jsonify(result = api.get_tasks())

@app.route('/pandatodo/api/delete')
def delTask():
	tID = request.args.get('_id')
	api.del_task(tID)

	return jsonify(result = api.get_tasks())

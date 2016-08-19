var tasks = [];
var tIDs = [];
var update_idx;

$(document).ready(function(){

//Add a Task
	$('#main-button').click(function(){ 
		addTask();
	});

//Edit a Task
	$('#editModal').on('show.bs.modal', function(e) {
    	update_idx = $(e.relatedTarget).index();	
	});

	$('#edit-button').click(function(){  
		editTask(update_idx, $('#edit-input2').val(), $('#edit-input').val());
	
	});

//Delete a Task
	$('ul').delegate("span", "click", function(event){ 
		event.stopPropagation(); 
		index = $('span').index(this); 
		delTask(index);
		$('li').eq(index).remove(); 
		tasks.splice(index, 1);
		tIDs.splice(index, 1);
	});


// UTILS

	// if input is empty, disable button
	$('button').prop('disabled', true);
	$('input').mouseover(function(){
		if($(this).val().length !== 0) {
			$('button').prop('disabled', false);
		} else {
			$('button').prop('disabled', true);
		}
	});

	// bind input enter with button submit
	$('#dateid').keypress(function(e){
		if ($('#dateid').val().length != 0)
				$('button').click();
		}
	);

	$('#edit-input').keypress(function(e){ 
		if(e.which === 13) {
			if ($('#edit-input').val().length !== 0)
				$('#edit-button').click();
		}
	});

});

// MAIN FUNCTIONS
function loadList(items){
	$('li').remove();
	if(items.length > 0) {
		for(var i = 0; i < items.length; i++) {
			$('ul').append('<li class= "list-group-item" data-toggle="modal" data-target="#editModal">' + items[i] + '<span class="glyphicon glyphicon-remove"></span</li>');
		}
	}
} // end loadList function

function getTasks(){
	$.getJSON('/pandatodo/api/tasks',{}, function(data){
		tasks = [];
		for(var i = 0; i< data.result.length; i++){
			disp = data.result[i].due_date + " : " + data.result[i].task;
			tasks.push(disp);
			tIDs.push(data.result[i]._id);
		}
		loadList(tasks);
	});
} // end getTasks function

function addTask(){
	$.ajax({
		type: 'GET',
		url: 'pandatodo/api/add',
		data: {task:$('#main-input').val(), due_date:$('#dateid').val()},
		success: function(data){
			var taskVal = $('#main-input').val(); 
			var dueVal = $('#dateid').val();
			disp = dueVal + " : " + taskVal;
			tasks.push(disp);

			$('#main-input').val('');
			$('#dateid').val('');

			loadList(tasks);
			$('button').prop('disabled', true);
		}
	});
} // end addTask function

function editTask(idx, t, due) {
	$.ajax({
		type: 'GET',
		url:'/pandatodo/api/edit',
		data: { _id : String(tIDs[idx]), task : t, due_date : due},
		success: function(data){
			getTasks();
		}
	});
} // end editTask function

function delTask(idx) {
	$.ajax({
		type: 'GET',
		url: 'pandatodo/api/delete',
		data: { _id : String(tIDs[idx])},
		success: function(data){
			getTasks();
		}
	});
} // end delTask function


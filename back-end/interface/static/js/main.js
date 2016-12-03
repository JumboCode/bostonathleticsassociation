var new_event_string;
var name;
var day;
var month;
var year;

function add_event() {
	new_event_string = '';
	new_event_string += '<div id = "new"> NEW </div>';
    new_event_string += '<div id = "ev"> EVENT </div>';
	new_event_string += '<div id = "box">';
	new_event_string += '<div id = "close" onclick = "close_pop()"> x </div>';
	new_event_string += '<input type = "text" id = "new_event" placeholder = "New Event"style="border:none; font-size: 3.3rem; width: 100%; text-align: center">';
	new_event_string += '<hr style="position:relative; top:-10px">';
	new_event_string += '<div id = "month">'; 
    new_event_string += '<div class="btn-group">';
    new_event_string += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span id = "m">Month </span><span class="caret"></span></button>';
    new_event_string += '<ul class="dropdown-menu scrollable-menu" role="menu">';
    new_event_string += '<li onclick = "set_month(1)" style="padding-left: 5%;">1</li>';

    for (i = 2; i <= 12; i++) {
    	new_event_string += '<li onclick = "set_month(' + i + ')" style="padding-left: 5%; padding-top: 5%">' + i + '</li>';
    }

    new_event_string += '</ul>';
    new_event_string += '</div>';
    new_event_string += '</div>';
    new_event_string += '<div id = "day">';
    new_event_string += '<div class="btn-group">';
    new_event_string += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span id = "d">Day </span>  <span class="caret"></span></button>';
    new_event_string += '<ul class="dropdown-menu scrollable-menu" role="menu">';
    new_event_string += '<li onclick = "set_day(1)" style="padding-left: 5%;">1</li>';

    for (i = 2; i <= 31; i++) {
    	new_event_string += '<li onclick = "set_day(' + i + ')" style="padding-left: 5%; padding-top: 5%">' + i + '</li>';
    }

    new_event_string += '</ul>';
    new_event_string += '</div>';
    new_event_string += '</div>';
    new_event_string += '<div id = "year">';
    new_event_string += '<div class="btn-group">';
    new_event_string += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span id = "y">Year </span>  <span class="caret"></span></button>';
    new_event_string += '<ul class="dropdown-menu scrollable-menu" role="menu">';
    new_event_string += '<li onclick = "set_year(2016)" style="padding-left: 5%;">2016</li>';

    var current_year = new Date().getFullYear();

    for (i = current_year + 1; i <= current_year + 10; i++) {
    	new_event_string += '<li onclick = "set_year(' + i + ')" style="padding-left: 5%; padding-top: 5%">' + i + '</li>';
    }

    new_event_string += '</ul>';
    new_event_string += '</div>';
    new_event_string += '</div>';
    new_event_string += '<div id = "upload">';
    new_event_string += '<label for="image">';
    new_event_string += '<input type="file" name = "image" id= "image" class= "file_upload" style="display:none;" onchange="check_file()">';

    new_event_string += '<img src= "../static/images/upload icon.png" alt="upload pic" style="">';
    new_event_string += '</label>';
    new_event_string += '</div>';
    new_event_string += '<div id = "up_vol">';
    new_event_string += 'Upload Volunteer Profiles';
    new_event_string += '</div>';
    new_event_string += '<div id = "submit" onclick="get_new_event_info()">';
    new_event_string += '<img src= "../static/images/submit.png" alt="submit pic" style="">';
    new_event_string += '</div>';
    new_event_string += '</div>';

    document.getElementById("right-col").innerHTML = new_event_string;
}

function view_past_event() {

	var title = "title";
	var month = "1";
	var day = "1"; 
	var year = "2016";

	new_event_string = '';
	new_event_string += '<div id = "new"> PAST </div>';
    new_event_string += '<div id = "ev"> EVENT </div>';
	new_event_string += '<div id = "box">';
	new_event_string += '<div id = "close" onclick = "close_pop()"> x </div>';
	new_event_string += '<div id = "past_event" style = "text-align: center; font-size: 3.3rem; padding: 11px">' + title + '</div>';
	new_event_string += '<hr style="position:relative; top:-10px">';
    new_event_string += month + '/' + day + '/' + year;
    new_event_string += '<div id = "upload">';
    new_event_string += '<label for="image">';
    new_event_string += '<input type="file" name="image" id= "image" style="display:none;">';
    new_event_string += '<br>';
    new_event_string += '<img src= "../static/images/download icon.png" alt="upload pic" style="">';
    new_event_string += '</label>';
    new_event_string += '</div>';
    new_event_string += '<div id = "up_vol">';
    new_event_string += 'Download Volunteer Profiles';
    new_event_string += '</div>';
    new_event_string += '</div>';

    document.getElementById("right-col").innerHTML = new_event_string;
}

function edit_event() {

	var title = "title";
	var month = "1";
	var day = "1"; 
	var year = "2016";
	var file_name = "fake.csv";

	new_event_string = '';
	new_event_string += '<div id = "new"> EDIT </div>';
    new_event_string += '<div id = "ev"> EVENT </div>';
	new_event_string += '<div id = "box">';
	new_event_string += '<div id = "close" onclick = "close_pop()"> x </div>';
	new_event_string += '<input type = "text" id = "new_event" placeholder = "' + title + '"style="border:none; font-size: 3.3rem; width: 100%; text-align: center">';
	new_event_string += '<hr style="position:relative; top:-10px">';
	new_event_string += '<div id = "month">'; 
    new_event_string += '<div class="btn-group">';
    new_event_string += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span id = "m">' + month +'</span><span class="caret"></span></button>';
    new_event_string += '<ul class="dropdown-menu scrollable-menu" role="menu">';
    new_event_string += '<li onclick = "set_month(1)" style="padding-left: 5%;">1</li>';

    for (i = 2; i <= 12; i++) {
    	new_event_string += '<li onclick = "set_month(' + i + ')" style="padding-left: 5%; padding-top: 5%">' + i + '</li>';
    }

    new_event_string += '</ul>';
    new_event_string += '</div>';
    new_event_string += '</div>';
    new_event_string += '<div id = "day">';
    new_event_string += '<div class="btn-group">';
    new_event_string += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span id = "d">'+ day +'</span>  <span class="caret"></span></button>';
    new_event_string += '<ul class="dropdown-menu scrollable-menu" role="menu">';
    new_event_string += '<li onclick = "set_day(1)" style="padding-left: 5%;">1</li>';

    for (i = 2; i <= 31; i++) {
    	new_event_string += '<li onclick = "set_day(' + i + ')" style="padding-left: 5%; padding-top: 5%">' + i + '</li>';
    }

    new_event_string += '</ul>';
    new_event_string += '</div>';
    new_event_string += '</div>';
    new_event_string += '<div id = "year">';
    new_event_string += '<div class="btn-group">';
    new_event_string += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span id = "y">'+ year +'</span>  <span class="caret"></span></button>';
    new_event_string += '<ul class="dropdown-menu scrollable-menu" role="menu">';
    new_event_string += '<li onclick = "set_year(2016)" style="padding-left: 5%;">2016</li>';

    var current_year = new Date().getFullYear();

    for (i = current_year + 1; i <= current_year + 10; i++) {
    	new_event_string += '<li onclick = "set_year(' + i + ')" style="padding-left: 5%; padding-top: 5%">' + i + '</li>';
    }

    new_event_string += '</ul>';
    new_event_string += '</div>';
    new_event_string += '</div>';
    new_event_string += '<div id = "upload">';
    new_event_string += '</div>';
    new_event_string += '<div id = "up_vol">';
    new_event_string += '<span style="margin-right: 20px">' + file_name + '</span>';
    new_event_string += '<span id="remove_upload" onclick="remove_upload()">x</span>';

    new_event_string += '</div>';
    new_event_string += '<div id = "submit" onclick="get_new_event_info()">';
    new_event_string += '<img src= "../static/images/submit.png" alt="submit pic" style="">';
    new_event_string += '</div>';
    new_event_string += '</div>';

    document.getElementById("right-col").innerHTML = new_event_string;
}

function check_file() {
	var file_type = document.getElementById("image").files[0].type;
	console.log(file_type);

	if (file_type != "text/csv") {
		alert("file must be of type filename.csv")
		return;
	}

	var remove = '<span id="remove_upload" onclick="remove_upload()">x</span>';

	var file_name = '<span style="margin-right: 20px">' + document.getElementById("image").files[0].name + '</span>';

	document.getElementById("up_vol").innerHTML = file_name + remove; 
}

function remove_upload() {

	var new_event_string = '';
	new_event_string += '<label for="image">';
    new_event_string += '<input type="file" name = "image" id= "image" class= "file_upload" style="display:none;" onchange="check_file()">';

    new_event_string += '<img src= "../static/images/upload icon.png" alt="upload pic" style="">';
    new_event_string += '</label>';

    document.getElementById("upload").innerHTML = new_event_string;
    document.getElementById("up_vol").innerHTML = "Upload Volunteer Profiles";
}

function get_new_event_info() {
	new_event = document.getElementById("new_event").value;
	console.log(new_event);

	document.getElementById("right-col").innerHTML = '';
}

function set_month(n) {
	document.getElementById("m").innerHTML = n;
	month = n;
}

function set_day(n) {
	document.getElementById("d").innerHTML = n;
	day = n;
}

function set_year(n) {
	document.getElementById("y").innerHTML = n;
	year = n;
}

function close_pop() {
	document.getElementById("right-col").innerHTML = '';
}

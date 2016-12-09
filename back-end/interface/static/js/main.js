var new_event_string;
var name;
var day;
var month;
var year;
var new_file;
var events;
var year_change;
var day_change;
var month_change;

function add_event() {
    year_change = false;
    month_change = false;
    day_change = false;
    new_file = false;
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
    new_event_string += '<img src= "/static/images/upload icon.png" alt="upload pic" style="">';
    new_event_string += '</label>';
    new_event_string += '</div>';
    new_event_string += '<div id = "up_vol">';
    new_event_string += 'Upload Volunteer Profiles';
    new_event_string += '</div>';
    new_event_string += '<div id = "submit" onclick="get_new_event_info()">';
    new_event_string += '<img src= "/static/images/submit.png" alt="submit pic" style="">';
    new_event_string += '</div>';
    new_event_string += '</div>';

    document.getElementById("right-col").innerHTML = new_event_string;
}

function view_past_event(i) {

	var title = events[i].name;
	var month = events[i].date.substr(5,2);
	var day = events[i].date.substr(8,2);
	var year = events[i].date.substr(0,4);

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
    new_event_string += '<img src= "/static/images/download icon.png" alt="upload pic" style="">';
    new_event_string += '</label>';
    new_event_string += '</div>';
    new_event_string += '<div id = "up_vol">';
    new_event_string += 'Download Volunteer Profiles';
    new_event_string += '</div>';
    new_event_string += '</div>';

    document.getElementById("right-col").innerHTML = new_event_string;
}

function edit_event(i) {
    var title = events[i].name;
    month = events[i].date.substr(5,2);
    month_change = false;
    day = events[i].date.substr(8,2);
    day_change = false;
    year = events[i].date.substr(0,4);
    year_change = false;
    new_file = false;
    var file_path = events[i].csv;
    var file_name = file_path.substring(file_path.lastIndexOf('/')+1);

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

    for (j = 2; j <= 12; j++) {
    	new_event_string += '<li onclick = "set_month(' + j + ')" style="padding-left: 5%; padding-top: 5%">' + j + '</li>';
    }

    new_event_string += '</ul>';
    new_event_string += '</div>';
    new_event_string += '</div>';
    new_event_string += '<div id = "day">';
    new_event_string += '<div class="btn-group">';
    new_event_string += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span id = "d">'+ day +'</span>  <span class="caret"></span></button>';
    new_event_string += '<ul class="dropdown-menu scrollable-menu" role="menu">';
    new_event_string += '<li onclick = "set_day(1)" style="padding-left: 5%;">1</li>';

    for (j = 2; j <= 31; j++) {
    	new_event_string += '<li onclick = "set_day(' + j + ')" style="padding-left: 5%; padding-top: 5%">' + j + '</li>';
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

    for (j = current_year + 1; j <= current_year + 10; j++) {
    	new_event_string += '<li onclick = "set_year(' + j + ')" style="padding-left: 5%; padding-top: 5%">' + j + '</li>';
    }

    new_event_string += '</ul>';
    new_event_string += '</div>';
    new_event_string += '</div>';
    new_event_string += '<br>';
    new_event_string += '<div id = "upload">';
    new_event_string += '</div>';
    new_event_string += '<div id = "up_vol">';
    new_event_string += '<span style="margin-right: 20px"><a style="color: #4A4A4A" href="'+ file_path + '" download="' + file_name + '">' + file_name + '</a></span>';
    new_event_string += '<span id="remove_upload" onclick="remove_upload()"><img src= "/static/images/remove_csv.png" alt="remove csv" style="height: 20px; width: 20px"></span>';
    new_event_string += '</div>';
    new_event_string += '<div id = "submit" onclick="update_event_data('+ i +')">';
    new_event_string += '<img src= "/static/images/submit.png" alt="submit pic" style="">';
    new_event_string += '</div>';
    new_event_string += '</div>';

    document.getElementById("right-col").innerHTML = new_event_string;
}

function check_file() {
    new_file = true;
	var file_type = document.getElementById("image").files[0].type;
	file = document.getElementById("image").files[0];

	if (file_type != "text/csv") {
		alert("file must be of type filename.csv")
		return;
	}

	var remove = '<span id="remove_upload" onclick="remove_upload()"><img src= "/static/images/remove_csv.png" alt="remove csv" style="height: 20px; width: 20px"></span>';

	var file_name = '<span style="margin-right: 20px">' + document.getElementById("image").files[0].name + '</span>';

	document.getElementById("up_vol").innerHTML = file_name + remove; 
}

function remove_upload() {

	var new_event_string = '';
	new_event_string += '<label for="image">';
    new_event_string += '<input type="file" name = "image" id= "image" class= "file_upload" style="display:none;" onchange="check_file()">';
    new_event_string += '<img src= "/static/images/upload icon.png" alt="upload pic" style="">';
    new_event_string += '</label>';

    document.getElementById("upload").innerHTML = new_event_string;
    document.getElementById("up_vol").innerHTML = "Upload Volunteer Profiles";
}

function get_new_event_info() {
    var new_event = document.getElementById("new_event").value;

    if (!(day_change && year_change && month_change && 
        !(new_event == "") && new_file)) {
        alert("Please complete all fields");
        return;
    }

    document.getElementById("right-col").innerHTML = '';
    var date = year + "-" + month + "-" + day;
    var url = window.location.origin;

    var data = new FormData();
    data.append("name", new_event);
    data.append("date", date);
    data.append("csv", file);

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        }
    });

    xhr.open("POST", url + "/api/events/");
    xhr.setRequestHeader("Authorization", window.token);

    xhr.send(data);
}

function set_month(n) {
    month_change = true;
    if (n < 10) {
        n = '0' + n;
    }

	document.getElementById("m").innerHTML = n;
	month = n;
}

function set_day(n) {
    day_change = true;
    if (n < 10) {
        n = '0' + n;
    }

	document.getElementById("d").innerHTML = n;
	day = n;
}

function set_year(n) {
    year_change = true;
	document.getElementById("y").innerHTML = n;
	year = n;
}

function close_pop() {
	document.getElementById("right-col").innerHTML = '';
}

function fill_year_picker() {
    var year_string = '';
    var current_year = new Date().getFullYear();

    var str = "Year ";
    year_string += '<li onclick = "set_year_picker(0)" style="padding-left: 5%; padding: 2.5%">Year</li>';

    for (i = current_year - 10; i <= current_year + 10; i++) {
        year_string += '<li onclick = "set_year_picker(' + i + ')" style="padding-left: 5%; padding: 2.5%">' + i + '</li>';
    }

    document.getElementById("yp").innerHTML = year_string;
}

function set_year_picker(year) {
    if (year == 0) {
        document.getElementById("findyear").innerHTML = "Year ";
    } else {
        document.getElementById("findyear").innerHTML = year;
    }
    get_all_events();
}

function get_all_events() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            events = JSON.parse(xhr.responseText);
            show_sorted();
        }
    }   

    var url = window.location.origin;
    xhr.open("GET", url + "/api/events/");
    xhr.setRequestHeader("Authorization", window.token);

    xhr.send();
}

function show_sorted() {
    year = document.getElementById("findyear").innerHTML;
    str = document.getElementById("serach_input").value;

    var events_string = "<ul>"; 

    if (str == "" && year != "Year ") {
        var rxy = new RegExp(year); 
        for (i=0; i<events.length; i++) {
            if (rxy.test(events[i].date)) {
                if (check_past_date(events[i].date))
                    events_string += '<li onclick = "view_past_event('+ i +')">' + events[i].name + '</li>';
                else
                    events_string += '<li onclick = "edit_event('+ i +')">' + events[i].name + '</li>';
            }
        }
    } else if (str != "" && year != "Year ") {
        var rxy = new RegExp(year); 
        var rxs = new RegExp(str, "i");
        for (i=0; i<events.length; i++) {
            if (rxy.test(events[i].date) && rxs.test(events[i].name)) {
                if (check_past_date(events[i].date))
                    events_string += '<li onclick = "view_past_event('+ i +')">' + events[i].name + '</li>';
                else
                    events_string += '<li onclick = "edit_event('+ i +')">' + events[i].name + '</li>';
            }
        }
    } else if (str != "" && year == "Year ") {
        var rxs = new RegExp(str, "i");
        for (i=0; i<events.length; i++) {
            if (rxs.test(events[i].name)) {
                if (check_past_date(events[i].date))
                    events_string += '<li onclick = "view_past_event('+ i +')">' + events[i].name + '</li>';
                else
                    events_string += '<li onclick = "edit_event('+ i +')">' + events[i].name + '</li>';
            }
        }
    }

    events_string += "</ul>";
    document.getElementById("Events").innerHTML = events_string;
}

function check_past_date(date) {
    var d = new Date();
    var current_year = d.getFullYear();
    var current_month = d.getMonth() + 1;
    var current_day = d.getDate();

    if (current_year > parseInt(date.substr(0,4)))
        return true;

    if (current_year == parseInt(date.substr(0,4))) {

        if (current_month > parseInt(date.substr(5,2)))
            return true;

        if (current_month == parseInt(date.substr(5,2))) {

            if (current_date > parseInt(date.substr(8,2))) {
                return true;
            }
        }
    }
    return false;
}

function update_event_data(i) {
    var new_event = document.getElementById("new_event").value;
    console.log(new_event);

    document.getElementById("right-col").innerHTML = '';
    var date = events[i].date;

    console.log(new_file);
    console.log(new_event == "");

    if (!(day_change || year_change || month_change || 
        !(new_event == "") || new_file)) {
        return;
    }
        
    if (day_change) {
        date = date.substr(0, 8) + day;
    }

    if (year_change) {
        date = year + date.substr(4, 6);
    }

    if (month_change) {
        date = date.substr(0, 5) + month + date.substr(7, 3);
    }
        
    console.log(date);

    var url = window.location.origin;

    var data = new FormData();

    if (new_event != "") {
        data.append("name", new_event);
    }

    data.append("date", date);

    if (new_file)
        data.append("csv", file);

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
            events[i] = JSON.parse(this.responseText);
            if (new_event != "")
                get_all_events();
        }
    });

    xhr.open("PATCH", url + "/api/events/" + events[i].id + "/");
    xhr.setRequestHeader("Authorization", window.token);

    xhr.send(data);
}

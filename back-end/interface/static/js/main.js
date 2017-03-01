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
    if (($('#right-col-content-edit').css('display') == 'block'))
        $("#right-col-content-edit").toggle("show");
    if (($('#right-col-content-view').css('display') == 'block'))
        $("#right-col-content-view").toggle("show");
	new_event_string = '';
    for (i = 1; i <= 12; i++) {
        new_event_string += '<li onclick = "set_month(' + i + ',\'add\')" style="padding-left: 5%; padding-top: 5%">' + i + '</li>';
    }
    $("#add-monthlist").html(new_event_string);
    new_event_string = '';
    for (i = 1; i <= 31; i++) {
        new_event_string += '<li onclick = "set_day(' + i + ',\'add\')" style="padding-left: 5%; padding-top: 5%">' + i + '</li>';
    }
    $("#add-daylist").html(new_event_string);
    new_event_string = '';
    var current_year = new Date().getFullYear();
    for (i = current_year; i <= current_year + 10; i++) {
        new_event_string += '<li onclick = "set_year(' + i + ',\'add\')" style="padding-left: 5%; padding-top: 5%">' + i + '</li>';
    }
    $("#add-yearlist").html(new_event_string);

    if (($('#right-col-content-add').css('display') != 'block')) {
        $("#right-col-content-add").toggle("show");
    }
    else {
        $("#right-col-content-add").toggle("show");
        $("#right-col-content-add").toggle("show");
    }
    year_change = false;
    month_change = false;
    day_change = false;
    new_file = false;
}

function view_past_event(i, events) {
    if (($('#right-col-content-edit').css('display') == 'block'))
        $("#right-col-content-edit").toggle("show");
    if (($('#right-col-content-add').css('display') == 'block'))
        $("#right-col-content-add").toggle("show");
	var title = events[i].fields.name;
	var month = events[i].fields.date.substr(5,2);
	var day = events[i].fields.date.substr(8,2);
	var year = events[i].fields.date.substr(0,4);
    var date = month + '/' + day + '/' + year;
    var init_title = $('#past_event').html();
    var init_date = $('#view-date').html();
    $('#past_event').html(title);
    $('#view-date').html(date);
    if (($('#right-col-content-view').css('display') != 'block') ||
        ((init_title == title && init_date == date))) {
        $("#right-col-content-view").toggle("show");
    }
    else {
        $("#right-col-content-view").toggle("show");
        $("#right-col-content-view").toggle("show");
    }
}

function edit_event(i, events) {
    if (($('#right-col-content-view').css('display') == 'block'))
        $("#right-col-content-view").toggle("show");
    if (($('#right-col-content-add').css('display') == 'block'))
        $("#right-col-content-add").toggle("show");
    var title = events[i].fields.name;
    month = events[i].fields.date.substr(5,2);
    month_change = false;
    day = events[i].fields.date.substr(8,2);
    day_change = false;
    year = events[i].fields.date.substr(0,4);
    year_change = false;
    new_file = false;
    var file_path = events[i].fields.csv;
    var file_name = file_path.substring(file_path.lastIndexOf('/')+1);
    new_event_string = '';
    $("#name").html("<p>" + title + "</p>");
	$("#date").html("<p>" + month + "/" + day + "/" + year + "</p>");
    $("#edit_yearlist").html(new_event_string);
    $("#file_name").prop("href", file_path);
    $("#file_name").prop("downloasd", file_name);
    $("#file_name").html(file_name);
    if (($('#right-col-content-edit').css('display') != 'block')) {
        $("#right-col-content-edit").toggle("show");
    }
    else {
        $("#right-col-content-edit").toggle("show");
        $("#right-col-content-edit").toggle("show");
    }
}

function check_file(func) {
    new_file = true;
	file = $("#"+func+"-image").prop("files")[0];

    if (!$("#"+func+"-image").prop("files")[0].name.match(/.(csv)$/i)) {
        alert('File must be of type .csv!');
        new_file = false;
        return;
    }
	var remove = '<span id="remove_upload" onclick="remove_upload(\''+func+'\')"><img src= "/static/images/remove_csv.png" alt="remove csv" style="height: 20px; width: 20px"></span>';

	var file_name = '<span style="margin-right: 20px">' + $("#"+func+"-image").prop("files")[0].name + '</span>';

	$("#"+func+"-up_vol").html(file_name + remove); 
}

function remove_upload(func) {

	var new_event_string = '';
	new_event_string += '<label for="'+func+'-image">';
    new_event_string += '<input type="file" name = "image" id= "'+func+'-image" accept= ".csv" class= "file_upload" style="display:none;" onchange="check_file(\''+func+'\')">';
    new_event_string += '<img src= "/static/images/upload icon.png" alt="upload pic" style="">';
    new_event_string += '</label>';
    $("#"+func+"-upload").html(new_event_string);
    $("#"+func+"-up_vol").html("Upload Volunteer Profiles");
}

function get_new_event_info() {
    var new_event = document.getElementById("add-new_event").value;

    if (!(day_change && year_change && month_change && 
        !(new_event == "") && new_file)) {
        alert("Please complete all fields");
        return;
    }

    var date = year + "-" + month + "-" + day;
    var url = window.location.origin;

    var data = new FormData();
    data.append("name", new_event);
    data.append("date", date);
    data.append("csv", file);

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        window.location.reload(true);
        }
    });

    xhr.open("POST", url + "/api/events/");
    xhr.setRequestHeader("Authorization", window.token);

    xhr.send(data);
}

function set_month(n, func) {
    month_change = true;
    if (n < 10) {
        n = '0' + n;
    }

	$("#"+func+"-m").html(n);
	month = n;
}

function set_day(n, func) {
    day_change = true;
    if (n < 10) {
        n = '0' + n;
    }

	$("#"+func+"-d").html(n);
	day = n;
}

function set_year(n, func) {
    year_change = true;
	$("#"+func+"-y").html(n);
	year = n;
}

function close_pop() {
    $("#right-col-content-add").toggle(false);
    $("#right-col-content-edit").toggle(false);
    $("#right-col-content-view").toggle(false);

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

function show_sorted(ent) {
    var events_string = "<ul>"; 
    console.log(ent);
    for (i=0; i<ent.length; i++) {
                if (check_past_date(ent[i].fields.date))
                    events_string += '<li onclick = "view_past_event('+ i + ', ent)">' + ent[i].fields.name + '</li>';
                else
                    events_string += '<li onclick = "edit_event('+ i +', ent)">' + ent[i].fields.name + '</li>';
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

            if (current_day > parseInt(date.substr(8,2))) {
                return true;
            }
        }
    }
    return false;
}

function update_event_data(i, events) {
    var new_event = document.getElementById("edit-new_event").value;
    var date = events[i].fields.date;

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
            events[i].fields = JSON.parse(this.responseText);
            if (new_event != "")
                get_all_events();
        }
    });
    //xhr.open("PATCH", url + "/api/events/" + events[i].fields.id + "/"); There is no id
    xhr.open("PATCH", url + "/api/events/" + events[i].pk + "/");
    xhr.setRequestHeader("Authorization", window.token);

    xhr.send(data);
}


function delete_event(i, events) {
    var new_event = document.getElementById("edit-new_event").value;

    var date = events[i].fields.date;


    var xhr = new XMLHttpRequest();

    var data = new FormData();

    if (new_event != "") {
        data.append("name", new_event);
    }

    data.append("date", date);

    if (new_file)
        data.append("csv", file);

    var url = window.location.origin;

    xhr.addEventListener("readystatechange", function () {
        console.log("changing ready state");
    if (this.readyState === 4) {
        console.log("hallo");
            window.location.reload(true);
        }
    });

    xhr.open("DELETE", url + "/api/events/" + events[i].pk + "/");
    xhr.setRequestHeader("Authorization", window.token);
    xhr.send(data);
}
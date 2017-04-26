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

/* Adds a new event */
function add_event() {
    if (($('#right-col-content-edit').css('display') == 'block'))
        $("#right-col-content-edit").toggle("show");
    if (($('#right-col-content-view').css('display') == 'block'))
        $("#right-col-content-view").toggle("show");
    $("li").css({"background-color":"rgba(255, 255, 255, 0.0)"});
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

/* Displays event info */
function edit_event(i, events) {
    if (($('#right-col-content-view').css('display') == 'block'))
        $("#right-col-content-view").toggle("show");
    if (($('#right-col-content-add').css('display') == 'block'))
        $("#right-col-content-add").toggle("show");
    $("li").css({"background-color":"rgba(255, 255, 255, 0.0)"});
    $("#event" + i).css({"background-color":"rgba(255, 255, 255, 0.3)"});
    
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
    $("#delete-button").attr("onclick","delete_event(" + i + ",  ent)");
    $("#user-pass-button").attr("onclick", "send_email(" + i + ", ent)");
    $("#gen-report-button").attr("onclick", "generate_report(" + i + ", ent)");



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


/* Checks for csv file extension */
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

/* If user clicks 'x', remove csv file */
function remove_upload(func) {

	var new_event_string = '';
	new_event_string += '<label for="'+func+'-image">';
    new_event_string += '<input type="file" name = "image" id= "'+func+'-image" accept= ".csv" class= "file_upload" style="display:none;" onchange="check_file(\''+func+'\')">';
    new_event_string += '<img src= "/static/images/upload icon.png" alt="upload pic" style="">';
    new_event_string += '</label>';
    $("#"+func+"-upload").html(new_event_string);
    $("#"+func+"-up_vol").html("Upload Volunteer Profiles");
}

/* retrieves data from user input boxes */
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

/* Retrieves and displays all events */
function show_sorted(ent) {
    var events_string = ""; 
    console.log(ent);
    for (i=0; i<ent.length; i++) {
        events_string += '<li id = "event' + i + '" onclick = "edit_event('+ i +', ent)">' + ent[i].fields.name + '</li>';
    }

    document.getElementById("old_events").innerHTML = events_string;
}

/* To be used later to not allow sending out emails for past events */
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

/* Deletes using api endpoint */
function delete_event(i, events) {

    var xhr = new XMLHttpRequest();

    var url = window.location.origin;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status == 200) {
          window.location.reload(true);
       } else if (this.readyState == 4 && this.status != 200){
          alert("There was a problem deleting this event. Please try again in a few minutes.");
      }
    });

    xhr.open("DELETE", url + "/api/events/" + events[i].pk + "/");
    xhr.setRequestHeader("Authorization", window.token);
    xhr.send();
}

/* Notifies team capains */
function send_email(i, events) {
    $("#user-pass-button").attr("class", "btn btn-default disabled");
    $("#red-alert").toggle("show");
    $.ajax({
        url: window.location.origin + "/api/notify_captains/event/" + events[i].pk + "/",
        success: function() {
            $("#user-pass-button").attr("class", "btn btn-default active");
            $("#red-alert").toggle(false);
            $("#green-alert").toggle(true);
        },
        error: function() {
            $("#red-alert-error").toggle(true);
            $("#green-alert").toggle(false);
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", window.token);
        }
    });
}

function generate_report(i, events) {
    $.ajax({
        url: window.location.origin + "/api/events/generatereport/" + events[i].pk + "/",
        success: function(data) {
            var resultCSV = document.createElement('a');
            resultCSV.download = 'EventReport_' + events[i].fields.name + '.csv';
            resultCSV.href = 'data:text/csv,' + encodeURIComponent(data);
            resultCSV.click();
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", window.token);
        },
        error: function() {
            $("#red-alert-error").toggle(true);
        }
    });

}




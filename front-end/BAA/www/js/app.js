// app.js
// Javascript that controls the log-in page of the BAA application
//
//
angular.module('starter', ['ionic'])

	// Disregard this area unless you know a lot about cordova
	// Keyboard management
	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.show();
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	});

var token;
var domain = "http://floating-castle-71814.herokuapp.com/";

function checkCredentials() {
	var user = document.getElementById("user").value;
	var pass = document.getElementById("pass").value;

	var url = domain + "api-token-auth" + "/";
	var request = new XMLHttpRequest();
	request.open("POST", url);
	request.setRequestHeader("content-type", "application/x-www-form-urlencoded");

	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
			token = JSON.parse(request.responseText)['token'];
			var resp = JSON.parse(request.responseText);

			// Get the attendee list
			var attendees = resp.volunteers;

			// Get attendee and token, store them into local storage
			localStorage.setItem("attendees", JSON.stringify(attendees));
			localStorage.setItem("token", token);

			// Redirect to attendee list page
			window.location.href = "list.html";
		}

		if (request.readyState === 4 & request.status !== 200) {
			alert("invalid login");
		}
	};

	request.send("username=" + user + "&password=" + pass);
}


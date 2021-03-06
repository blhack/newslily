//this does nothing yet
function login(user,password,token) {
	$.post("/cgi-bin/login.cgi", {"user":user,"password":password,"token":token})
		.done( function(data) {
			var session_id = data["session_id"];
			$.cookie("session_id", session_id);
			location.reload();
		} );
	}

function logout() {
	$.removeCookie("session_id");
	$.post("/cgi-bin/logout.cgi");
	location.reload();
	}

function whoami() {
	var session_id = $.cookie("session_id");
	$.post("/cgi-bin/whoami.cgi", {"session_id":session_id})
		.done(function(data) {
			var user = data["user"];
			console.log(user);
			return(user);
		})
	}

function submit_object(url,title,category,token) {
	$.post("/cgi-bin/submit_object.cgi", {"url":url,"title":title,"category":category,"token":token})
		.done(function(data) {
			var object_id = data["object_id"];
			window.location.assign("/object?object_id=" + object_id);
		})
	}

function get_object_info(object_id) {
	$.post("/cgi-bin/object_info.cgi", {"object_id":object_id})
		.done(function(data) {
			$("#url").text(data["url"]);
			$("#title").text(data["title"]);
			$("#category").text(data["category"]);
			$("#user").text(data["user"]);
		});
	}

function populate_with_links(div,last) {
	$.post("/cgi-bin/list_objects.cgi", {"last":last})
	.done(function(data) {
		for (var link in data) {
			link = data[link]
			console.log("Blink"); //debug
			console.log(link);
			object = "<div class=link>"
			object += "<div id=" + link["id"] + " class=object_title><a href='" + link["url"] + "'>" + link["title"] + "</a>";
			object += "<div class=object_byline> Submitted <span class=age>some time</span> ago by <span class=submitter_name>" + link["user"] + "</span>";
			object += "</div>";
			object += "</div>";
			object += "</div>";
			$("#links").append(object);
			}
		})
	}
	
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

var Profile = require("./profile.js");
var renderer = require("./renderer.js")
var querystring = require("querystring");
var commonHeaders = {'Content-Type': 'text/html'};

function home(request, response) {
	//if url === "/" && GET
		//show search field
	if(request.method.toLowerCase() === "get") {
			response.writeHead(200, commonHeaders);
			renderer.view("header", {}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
	}
	else {
			//if url === "/" && POST
		request.on("data", function(postBody) {
			var query = querystring.parse(postBody.toString());
			//redirect to /username
			response.writeHead(303, {"Location": "/" + query.username});
			response.end();
		});
			//get the post data from body
			//extract the username
			//redirect to /:username
		
	}
}	
//3. handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
	var username = request.url.replace("/", "");
	if(username.length > 0) {
		response.writeHead(200, commonHeaders);
		renderer.view("header", {}, response);
		//get json from treehouse
		var studentProfile = new Profile(username);
		studentProfile.on("end", function(profileJSON) {
			//show profile

			//store the values we need
			var values = {
				avatarUrl: profileJSON.gravatar_url,
				username: profileJSON.profile_name, 
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			}
			//simple response
			renderer.view("profile", values, response);
			renderer.view("footer", {}, response);
			response.end();
		});
		studentProfile.on("error", function(error) {
			//show error
			renderer.view("error", {errorMessage: error.message}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();			
		});

	}
}

module.exports.home = home;
module.exports.user = user;
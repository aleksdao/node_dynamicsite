//problem: we need a simple way to look at a user's badget count and Javascript points from a web browser
//solution: use node.js to perform the profile look ups and serve our templates via http

//1. create a web server
var router = require('./router.js');
var http = require('http');
http.createServer(function (request, response) {
	    if (request.url === '/') {
	    	router.home(request, response);
	    }
	    else {
	    	router.user(request, response);
	    }
	//response.end('Hello World\n');
}).listen(3000);
console.log('Server running at port 3000');

//2. handle HTTP route GET / and POST / i.e. Home

	//if url == "/..."
		//get json from Treehouse
			//on "end"
				//show profile
			//on "error"
				//show error

//4. Function that handles the reading of files and merge in value
	//read from file and get a string
		//merge values into string



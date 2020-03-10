/* ------ Simple HELLO WORLD example ------ */

/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

/* ----------------------------------------- */


/* ---------- Simple CRUD example ---------- */

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var fs = require("fs");

/* Creates a new User to be added to the list of Users */
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

/* CRUD manipulation (READ, CREATE, GETbyID/UPDATE, DELETE) */
http.createServer(function (request, response) {

	if(request.url ==='/listUsers'){
		//Reading the existing list of Users...
		fs.readFile("users.json", 'utf8', function (err, data) {
		    console.log( data );
		    response.end( data );
    	});
	}else if (request.url ==='/addUser') {
		// First read existing users.
   	    fs.readFile("users.json", 'utf8', function (err, data) {
	        data = JSON.parse( data );
	        data["user4"] = user["user4"];
	        console.log( data );
	        response.end( JSON.stringify(data));
	    });
	}else if (request.url ==='/:id') {
		
	}else if (request.url ==='/deleteUser') {
		
	}else if (request.url ==='/') {
		response.write('<h1>Hello World!<h1>'); //write a response
    	response.end();
	}else{
		response.write("<h1>HTTP - 404</h1><p>Bad Request!</p>"); //write a error response
    	response.end(); //end the response
	}

}).listen(port, function(){
 console.log(`Server running at http://${hostname}:${port}/`); //the server object listens on port 3000
});
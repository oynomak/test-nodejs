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

/* CRUD manipulation (READ, CREATE, GETbyID/UPDATE, DELETE) */
http.createServer(function (request, response) {

	if(request.url ==='/listUsers'){
		//Reading the existing list of Users...
		fs.readFile("users.json", 'utf8', function (err, data) {
		    console.log( data );
		    response.end( data );
    	});
	}else if (request.url ==='/addUser') {

	    addUser4(response);

	}else if (request.url ==='/:id') {// Check if we can get this parameter here... I am not getting it... :(

		findUser(request.params.id, response);
		
	}else if (request.url ==='/deleteUser') {

		deleteUser2(response);
		
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

function addUser4(response){
	/* Creates a new User to be added to the list of Users */
	var user = {
	   "user4" : {
	      "name" : "mohit",
	      "password" : "password4",
	      "profession" : "teacher",
	      "id": 4
	   }
	}

	// Read through file that has users
    fs.readFile("users.json", 'utf8', function (err, data) {

		// First read existing users, then add new one
	    data = JSON.parse( data );

	    // Then add new User4
	    data["user4"] = user["user4"];
	    console.log( user["user4"] );
	    response.end( JSON.stringify(data));
	});
}

function findUser(userId, response){
	// First read existing users, then get the specific one
    fs.readFile("users.json", 'utf8', function (err, data) {
        var users = JSON.parse( data );
        var user = users["user" + userId];
        console.log( user );
        response.end( JSON.stringify(user));
    });
}

function deleteUser2(response){
	
    fs.readFile("users.json", 'utf8', function (err, data) {
    	// First read existing users
        data = JSON.parse( data );

        // Then delete the User2
        delete data["user" + 2];
       
        console.log( data );
        response.end( JSON.stringify(data));
    });
		
}
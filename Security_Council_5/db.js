//http://blog.modulus.io/nodejs-and-sqlite

var fs = require('fs');
var file = 'test.db';
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);


if(!exists) {
  console.log("Creating DB file.");
  fs.openSync(file, "w");
}

db.serialize(function() {
	console.log('Create db table here!!');
});

/*//configuration
var config = require('config');
//database
if (config.useDatabase === true){
	console.log('use db.js');
}
else{
	console.log('use tempdb.js');
}*/
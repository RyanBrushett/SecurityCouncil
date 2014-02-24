//http://blog.modulus.io/nodejs-and-sqlite

var sqlite3 = require("sqlite3").verbose();

var database = new Database();

function Database()
{
	this.user = {};
	this.room = {};
	this.resolution = {};
	this.subclause = {};
	this.clause = {};
	//this.db = new sqlite3.Database('test.db');
}

/*
 * get methods: retrieve all users, rooms, resolution etc. tables
 */ 
database.user.getall = function (){
	/*db.all("select * from user", function(records){
		console.log(records);
	});*/
};

database.room.getall = function (){
	console.log("This method has not yet been implemented");
};

database.resolution.getall = function (){
	console.log("This method has not yet been implemented");
};

database.subclause.getall = function (){
	console.log("This method has not yet been implemented");
};

database.clause.getall = function (){
	console.log("This method has not yet been implemented");
};


/*
 * set methods: insert data into users, rooms, resolution etc. tables
 */
database.user.insert = function (data){
	console.log("This method has not yet been implemented");
};

database.room.insert = function (data){
	console.log("This method has not yet been implemented");
};

database.resolution.insert = function (data){
	console.log("This method has not yet been implemented");
};

database.subclause.insert = function (data){
	console.log("This method has not yet been implemented");
};

database.clause.insert = function (data){
	console.log("This method has not yet been implemented");
};





module.exports = database;
/*
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
*/
/*//configuration
var config = require('config');
//database
if (config.useDatabase === true){
	console.log('use db.js');
}
else{
	console.log('use tempdb.js');
}*/
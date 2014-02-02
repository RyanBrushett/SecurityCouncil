var db = require('../tempdb');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

/*
 * GET login page.
 */

exports.login = function(req, res) {
  res.render('index');
};


exports.loginUser = function(req, res) {

	  // pull the form variables off the request body
	  var username = req.body.username;
	  var password = req.body.password;

	  var check = 0;
	  var users = db.users
	  var name;
	  var pass;
	  var permission;
	  
	  console.log(users.length);
	  for(var i = 0; i < users.length; i++)
	  {
		name = users[i].UserName;
		pass = users[i].Password;
		permission = users[i].Position

		if(name == username && pass == password) 
			{
				if(permission == "member" || permission == "ambassador")
					check = 1;
				
				else
					check = 2;
			}
		break;
	  }

	  console.log(check);
	 if(check == 1){

	   // Normal user

	    res.render('chatroom', { title: 'Chatroom'});
	  }
	 
	 else if (check == 2){
		 //user is an admin
		 res.render('chatroom', { title: 'Chatroom'});
	 }
		 
	  else {
	    // failure
		  res.render('index', username);

	  }
	};
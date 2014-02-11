var db = require('../tempdb');

exports.index = function(req, res){
    res.render('index', {title: 'S.C. Sim 9000'});
};

exports.login = function(req, res) {
    var confirm;
    if (req.param("signupConfirmed") === "true"){
        confirm = "<h2>User Created</h2>";
    }
    res.render('login', {
        title:'S.C. Sim 9000',
        confirm:confirm
    });
};


exports.loginUser = function(req, res) {
  // pull the form variables off the request body
  var username = req.body.username;
  var password = req.body.password;

  var check = 0;
  var users = db.users;
  var name;
  var pass;
  var permission;
  var user;
  
  for (var i = 0; i < users.length; i++) {
        name = users[i].UserName;
        pass = users[i].Password;
        permission = users[i].Position;
        if(name === username && pass === password) {
            user = users[i];
            if(permission === "member" || permission === "ambassador") check = 1;
            if(permission === "administrator") check = 2;
            break;        
      }
  }

 if(check == 1){
   // Normal user
    req.session.regenerate(function(){
       req.session.user = user;
       req.session.success = 'Authenticated as ' + user.UserName;
       res.redirect('/');
    });
  } else if (check == 2){
         //user is an admin
         // change to after join
         // res.render('sc-admin');
    req.session.regenerate(function(){
       req.session.user = user;
       req.session.success = 'Authenticated as ' + user.UserName;
       res.redirect('/sc-admin');
    });
  } else {
    // failure
      req.session.error = 'Authentication failed';
      res.redirect('/login');
  }
};

exports.logout = function(req,res){
    req.session.destroy(function(){
        res.redirect('/login');
    });
};
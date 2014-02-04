var db = require('../tempdb');

exports.index = function(req, res){
    res.render('index', {title: 'S.C. Sim 9000'});
};

exports.login = function(req, res) {
  res.render('login', {title: 'S.C. Sim 9000'});
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
  
  console.log(users.length);
  for (var i = 0; i < users.length; i++) {
        name = users[i].UserName;
        pass = users[i].Password;
        permission = users[i].Position;
        if(name === username && pass === password) {
            user = users[i];
            if(permission === "member" || permission === "ambassador") check = 1;
            else check = 2;
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
    res.render('sc-admin', { title: 'S.C. Sim 9000'});
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
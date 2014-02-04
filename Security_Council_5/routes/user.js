var users = require('../db').users;
var members = require('../tempdb').members;

exports.getuserinfo = function(req, res){
    var user = req.param('username');
    
    var pass = "";
    var selectedcountry = "";
    for(var i = 0; i < users.length; i++){
        if(users[i].username === user){
            pass = users[i].password;
            selectedcountry = users[i].country;
        }
    }
    
    var mbrkey = [];
    for(var i=0; i < members.length; i++){
        if(members[i] != selectedcountry){
            mbrkey.push({country:members[i]});
        }
    }
    
    var countryhtml = "<option value=\"" + selectedcountry +"\" selected>" + selectedcountry + "</option>";
    
    res.render('admin/userinfo', {
        username: user,
        password: pass,
        usercountry: countryhtml,
        teams: mbrkey
    });
};

exports.list = function(req, res){
  res.render("user");
};

exports.changeuserpassword = function(req, res){
    var user = req.param('username');
    var pass = req.param('password');
    
    for(var i=0; i<users.length; i++){
        if(users[i].username === user){
            users[i].password = pass;
        }
    }
    res.render('admin/manageusers', {
        title: 'User Management',
        userlist: users
    });
};

exports.updateusersettings = function(req, res){
    var user = req.param('username');
    var team = req.param('team');
    
    for(var i = 0; i < users.length; i++){
        if(users[i].username === user){
            users[i].country = team;
            console.log(team);
        }
    }
    
    res.render('admin/manageusers', {
        title: 'User Management',
        userlist: users
    });
};


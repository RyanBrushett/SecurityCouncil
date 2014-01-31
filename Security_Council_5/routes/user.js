var users = require('../db').users;
var members = require('../db').members;

exports.getuserinfo = function(req, res){
    var user = req.param('username');
    
    var mbrkey = [];
    for(var i=0; i < members.length; i++){
        mbrkey.push({country:members[i]});
    }
    
    res.render('admin/userinfo', {
        username: user,
        teams: mbrkey
    });
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
}
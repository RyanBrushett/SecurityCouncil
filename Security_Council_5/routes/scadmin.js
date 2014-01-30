var rooms = require('../db').rooms;
var users = require('../db').users;
var Hogan = require('hjs');

// sc-admin dash landing page
exports.getscadmin = function(req,res){
    res.render('sc-admin', {
                title: 'Administration Dashboard'
    });
};

// simulation page get and post (same for now)
exports.getmakesim = function(req,res){
    res.render('admin/makesim', {
        title: 'Simulation Management'
    });		
};
exports.postmakesim = function(req,res){
    res.render('admin/makesim');
};

// user management page get & post
exports.getmanageusers = function(req,res){
    res.render('admin/manageusers', {
        title : 'User Management',
        userlist: users
    });
};
exports.postmanageusers = function(req, res){
    // plain-text password for now
    var idx = users.length;
    users.push({id: idx, username: req.param('username'), password: req.param('password')});
    
    res.render('admin/manageusers', {
        title: 'User Management',
        userlist: users
    });
};
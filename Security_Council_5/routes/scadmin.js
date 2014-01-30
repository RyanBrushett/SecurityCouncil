var rooms = require('../db').rooms;
var users = require('../db').users;
var Hogan = require('hjs');

// sc-admin dash landing page
exports.getscadmin = function(req,res){
    res.render('sc-admin', {
                title: 'Admin Page'
    });
};

// simulation page get and post (same for now)
exports.getmakesim = function(req,res){
    res.render('admin/makesim');		
};
exports.postmakesim = function(req,res){
    res.render('admin/makesim');
};

// user management page get & post
exports.getmanageusers = function(req,res){
    res.render('admin/manageusers');
};
exports.postmanageusers = function(req, res){
    res.render('admin/manageusers');
    console.log("manageusers POST");
};
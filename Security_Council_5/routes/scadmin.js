var rooms = require('../db').rooms;
var users = require('../db').users;
var Hogan = require('hjs');

exports.getscadmin = function(req,res){
    var view     = {names: users};
    var template = "{{#names}}<li>Name: {{name}} - ID: {{id}}</li>{{/names}}";
    var compiled = Hogan.compile(template);
    var html     = compiled.render(view);
    res.render('sc-admin', {
                title: 'Admin Page',
                userlist: html
    });
};

// Demonstrates storing things in our wacky memory database
exports.postscadmin = function(req,res){
    var view     = {names: users};
    var template = "{{#names}}<li>Name: {{name}} - ID: {{id}}</li>{{/names}}";
    var compiled = Hogan.compile(template);
    var html     = compiled.render(view);
    rooms.push(req.param('room'));
    res.render('sc-admin', {
                title: 'Admin Page',
                roomname: req.param('room'),
                userlist: html
    });
};

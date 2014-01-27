var rooms = require('../db').rooms;
var users = require('../db').users;
var Hogan = require('hjs');
var path  = require('path');
var fs    = require('fs');
var util  = require('util');

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

exports.switchscadmin = function(req,res){
    /** 
      * This fires back as the response to the XMLHttpRequest
      * so we can use it to replace parts of the page.
      * We can do portions of pages like this with simple AJAX requests.
      */
    var name = req.param('name');
    res.render('admin/createroom', {name: name});
}

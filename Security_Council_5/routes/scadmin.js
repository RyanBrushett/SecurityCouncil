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

exports.createroom = function(req,res){
    /** 
      * This fires back as the response to the XMLHttpRequest
      * so we can use it to replace parts of the page.
      * We can do portions of pages like this with simple AJAX requests.
      */
    var name = req.param('name');
    // Note that the name: name part is option and just for demonstration
    res.render('admin/createroom', {name: name});
}

exports.manageusers = function(req,res){
    var page = req.param('page');
    // See above. We're rendering just a part of a page as a response to an AJAX request.
    res.render('admin/manageusers', {page: page});
}

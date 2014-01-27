var rooms = require('../db').rooms;
var users = require('../db').users;
var Hogan = require('hjs');

exports.getscadmin = function(req,res){
    res.render('sc-admin', {
                title: 'Admin Page'
    });
};

// Demonstrates storing things in our wacky memory database
exports.postscadmin = function(req,res){
    var idx;
    if (rooms.length > 0) idx = rooms.length;
    else idx = 0;
    rooms.push({id: idx, name: req.param('room')});
    res.render('sc-admin', {
                title: 'Admin Page'
    });
};

exports.createroom = function(req,res){
    /** 
      * This fires back as the response to the XMLHttpRequest
      * so we can use it to replace parts of the page.
      * We can do portions of pages like this with simple AJAX requests.
      */
    var name = req.param('name');
    var view     = {sims: rooms};
    var template = "<ul>{{#sims}}<li>Name: {{name}}</li>{{/sims}}</ul>";
    var compiled = Hogan.compile(template);
    var html     = compiled.render(view);
    // Note that the name: name part is option and just for demonstration
    res.render('admin/createroom', {roomlist: html});
}

exports.manageusers = function(req,res){
    var page = req.param('page');
    // See above. We're rendering just a part of a page as a response to an AJAX request.
    res.render('admin/manageusers');
}

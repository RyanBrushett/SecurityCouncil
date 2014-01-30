var rooms = require('../db').rooms;
var users = require('../db').users;
var Hogan = require('hjs');

// sc-admin dash landing page
exports.getscadmin = function(req,res){
    res.render('sc-admin', {
        title: 'Admin Dashboard'
    });
};

// simulation page get and post (same for now)
exports.getmakesim = function(req,res){
    var roomlist = "";
    if (rooms.length == 0){
        roomlist = "There are currently no created simulations";
    } else {
        var view     = {sims:rooms};
        var template = "<dl class=\"roomlist\">{{#sims}}" +
                       "<dt class=\"roomname\">" +
                       "<a href=\"/sc-admin/managesim/{{name}}\">{{name}}</a>" +
                       "</dt>" +
                       "<dd class=\"roomprop\">ID: {{id}}</dd>" +
                       "<dd class=\"roomprop\">Admin: {{admin}}</dd>" +
                       "<dd class=\"roomprop\">Sort: {{sort}}</dd>" +
                       "{{/sims}}</dl>";
        var compiled = Hogan.compile(template);
        var html     = compiled.render(view);
    }
    res.render('admin/makesim',{
        title:'Simulation Manager',
        roomlist:html
    });
};

exports.postmakesim = function(req,res){
    var params = req.param('room') + "<br />" + req.param('admin') + "<br />" + 
                 req.param('country') + "<br />" + req.param('teamsort') + "<br />" +
                 req.param('box1') + "<br />" + req.param('box2');
    var idx;
    if (rooms.length <= 0){
        idx = 0;
    } else {
        idx = rooms.length;
    }
    var room = {
        id:idx,
        name:req.param('room'),
        admin:req.param('admin'),
        sort:req.param('teamsort')
    };
    rooms.push(room);
    var roomlist = "";
    if (rooms.length == 0){
        roomlist = "There are currently no created simulations";
    } else {
        var view     = {sims:rooms};
        var template = "<dl class=\"roomlist\">{{#sims}}" +
                       "<dt class=\"roomname\">" +
                       "<a href=\"/sc-admin/managesim/{{name}}\">{{name}}</a>" +
                       "</dt>" +
                       "<dd class=\"roomprop\">ID: {{id}}</dd>" +
                       "<dd class=\"roomprop\">Admin: {{admin}}</dd>" +
                       "<dd class=\"roomprop\">Sort: {{sort}}</dd>" +
                       "{{/sims}}</dl>";
        var compiled = Hogan.compile(template);
        var html     = compiled.render(view);
    }
    res.render('admin/makesim',{
        title:'Simulation Manager',
        roomlist:html
    });
};

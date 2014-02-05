var rooms   = require('../tempdb').rooms;
var users   = require('../tempdb').users;
var members = require('../tempdb').members;
var resolutions = require('../tempdb').resolutions;
var Hogan   = require('hjs');

// sc-admin dash landing page
exports.getscadmin = function(req,res){
    res.render('sc-admin', {
        title: 'Admin Dashboard',
        numusers: users.length,
        numsims: rooms.length
    });
};

// sc-admin handle get for sim manager
exports.getmakesim = function(req,res){
    var roomlist = "";
    var html = "";
    if (rooms.length === 0){
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
        html         = compiled.render(view);
    }
    res.render('admin/makesim',{
        title:'Simulation Manager',
        roomlist:html
    });
};

exports.postmakesim = function(req,res){
    var idx;
    if (rooms.length <= 0) idx = 0;
    else idx = rooms.length;
    
    // Sort the teams
    if (req.param('teamsort') === 'Random'){
       users = shuffle(users);
       var membs = shuffle(members);
       var j = 0;
       for (var i = 0; i < users.length; i++){
           if (j >= membs.length) j = 0;
           users[i].country = membs[j];
           j++;
       }
    }
    
    // Create the room
    var room = {
        id:idx,
        name:req.param('room'),
        admin:req.param('admin'),
        sort:req.param('teamsort')
        // TODO: Push a team list to the room.
    };
    rooms.push(room);

    var roomlist = "";
    var html = "";
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
        html         = compiled.render(view);
    }
    res.render('admin/makesim',{
        title:'Simulation Manager',
        roomlist:html
    });
};

exports.getmanageusers = function(req,res){
    res.render('admin/manageusers', {
        title : 'User Management',
        userlist: users
    });
};

exports.postmanageusers = function(req, res){
    // plain-text password for now
    var idx = users.length;
    users.push({Id: idx, Name: req.param('name'), UserName: req.param('username'), Password: req.param('password'), Country: "Not Assigned", Position: "member"});
    
    res.render('admin/manageusers', {
        title: 'User Management',
        userlist: users
    });
};

exports.getmanageresolutions = function(req, res){
    res.render('admin/manageresolutions', {
        title : 'Resolution Management',
        resolutionlist: resolutions
    });
};

exports.restrict = function(req,res,next){
  if (req.session.user){
      next();
  } else {
      req.session.error = 'Access Denied!';
      res.redirect('/login');
  }
};

function shuffle(array){
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;
    while (0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

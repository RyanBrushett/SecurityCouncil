var rooms = require('../tempdb').rooms;
var Hogan = require('hjs');

exports.getroombyid = function(req,res){
    if (rooms.length == 0){
        res.status(404).send('Not Found <a href="/">BACK</a>');
        return;
    }
    var room;
    for (var i = 0; i < rooms.length; i++){
        if (rooms[i].name === req.param('name')){
            room = rooms[i];
        }
    }
    if (room.name == undefined){
        res.status(404).send('Not Found <a href="/">BACK</a>');
        return;
    }
    res.render('rooms/room',{
        title:room.name,
        roomname:room.name,
        id:room.id,
        admin:room.admin,
        sort:room.sort
    });
};
exports.getallrooms = function(req,res){
    var roomlist = "";
    if (rooms.length == 0){
        roomlist = "There are currently no created simulations";
        var html = roomlist;
    } else {
        var view     = {sims:rooms};
        var template = "<dl class=\"roomlist\">{{#sims}}" +
                       "<dt class=\"roomname\">" +
                       "<a href=\"/sim/{{name}}\">{{name}}</a>" +
                       "</dt>" +
                       "<dd class=\"roomprop\">ID: {{id}}</dd>" +
                       "<dd class=\"roomprop\">Admin: {{admin}}</dd>" +
                       "<dd class=\"roomprop\">Sort: {{sort}}</dd>" +
                       "{{/sims}}</dl>";
        var compiled = Hogan.compile(template);
        var html     = compiled.render(view);
    }
    res.render('rooms/roomlist',{
        title:'Sim List',
        roomlist:html
    });
};
exports.joinroom = function(req,res){
    if (rooms.length == 0){
        res.status(404).send('Not Found. <a href="/">BACK</a>');
        return;
    }
    var room;
    for (var i = 0; i < rooms.length; i++){
        if (rooms[i].name === req.param('name')){
            room = rooms[i];
        }
    }
    if (room.name == undefined){
        res.status(404).send('Not Found. <a href="/">BACK</a>');
        return;
    }
    res.render('rooms/joinroom',{
        title:room.name,
        roomname:room.name,
        id:room.id,
        admin:room.admin,
        sort:room.sort
    });
};
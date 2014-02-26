var db = require('../db');

exports.view = function(req, res) {
    res.render('simulation/new');
};

exports.create = function(req, res) {
    var resolution = db.helpers.createResolution({
        title: req.body.title,
        content: req.body.content
    });
    db.helpers.createSimulation({
        name: req.body.name,
        resolution: resolution
    });
    res.redirect('/');
};

/*
exports.getroombyid = function(req,res){
    if (rooms.length === 0){
        res.status(404).send('Not Found <a href="/">BACK</a>');
        return;
    }
    var room;
    for (var i = 0; i < rooms.length; i++){
        if (rooms[i].name === req.param('name')){
            room = rooms[i];
        }
    }
    if (room.name === undefined){
        res.status(404).send('Not Found <a href="/">BACK</a>');
        return;
    }
    var userlist = room.users;
    var userlistView  = {users:userlist};
    var userlistTmplt = "{{#users}}{{UserName}}<br />{{/users}}";
    var userlistCmpld = Hogan.compile(userlistTmplt);
    var userlistHtml  = userlistCmpld.render(userlistView);
    res.render('rooms/room',{
        title:room.name,
        roomname:room.name,
        id:room.id,
        admin:room.admin.Name,
        sort:room.sort,
        userlist:userlistHtml
    });
};
exports.getallrooms = function(req,res){
    var html;
    if (rooms.length === 0){
        html = "There are currently no created simulations";
    } else {
        var view     = {sims:rooms};
        var template = "<dl class=\"roomlist\">{{#sims}}" +
                       "<dt class=\"roomname\">" +
                       "<a href=\"/sim/{{name}}\">{{name}}</a>" +
                       "</dt>" +
                       "<dd class=\"roomprop\">ID: {{id}}</dd>" +
                       "<dd class=\"roomprop\">Admin: {{admin.name}}</dd>" +
                       "<dd class=\"roomprop\">Sort: {{sort}}</dd>" +
                       "{{/sims}}</dl>";
        var compiled = Hogan.compile(template);
        html         = compiled.render(view);
    }
    res.render('rooms/roomlist',{
        title:'Sim List',
        roomlist:html
    });
};
exports.joinroom = function(req,res){
    if (rooms.length === 0){
        res.status(404).send('Not Found. <a href="/">BACK</a>');
        return;
    }
    var room;
    for (var i = 0; i < rooms.length; i++){
        if (rooms[i].name === req.param('name')){
            room = rooms[i];
        }
    }
    if (room.name === undefined){
        res.status(404).send('Not Found. <a href="/">BACK</a>');
        return;
    }
    res.render('rooms/joinroom',{
        title:room.name,
        roomname:room.name,
        id:room.id,
        admin:room.admin.Name,
        sort:room.sort
    });
};
*/

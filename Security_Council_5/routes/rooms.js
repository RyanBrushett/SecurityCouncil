var rooms = require('../db').rooms;
var Hogan = require('hjs');

exports.getroombyid = function(req,res){
    if (rooms.length == 0){
        res.status(404).send('Not Found');
    }
    var room;
    for (var i = 0; i < rooms.length; i++){
        if (rooms[i].name === req.param('name')){
            room = rooms[i];
        }
    }
    if (room.name == undefined){
        res.status(400).send('Not Found');
    }
    res.render('room',{
        title:room.name,
        roomname:room.name,
        id:room.id,
        admin:room.admin,
        sort:room.sort
    });
};
var rooms = require('../db').rooms;

exports.getscadmin = function(req,res){
    res.render('sc-admin', {title: 'Admin Page'});
};

// Demonstrates storing things in our wacky memory database
exports.postscadmin = function(req,res){
    rooms.push(req.param('room'));
    res.render('sc-admin', {
                title: 'Admin Page',
                roomname: req.param('room')
    });
};

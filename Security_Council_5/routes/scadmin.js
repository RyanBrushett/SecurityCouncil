var rooms = require('../db').rooms;
var users = require('../db').users;
var Hogan = require('hjs');

exports.getscadmin = function(req,res){
    res.render('sc-admin', {
                title: 'Admin Page'
    });
};
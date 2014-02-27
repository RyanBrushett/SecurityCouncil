var db = require('../db');

exports.view = function(req, res) {
    res.render('simulation/new');
};

exports.create = function(req, res) {
    var resolution = db.helpers.createResolution({
        title: req.body.title,
        content: req.body.content
    });
    var simulation = db.helpers.createSimulation({
        name: req.body.name,
        resolution: resolution
    });
    var users = db.users;
    res.redirect('/');
};
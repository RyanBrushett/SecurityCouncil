var db = require('../db');

exports.view = function(req, res) {
    var currentUser = db.users[req.session.userId];
    res.render('simulation/new', {
        user: currentUser
    });
};

exports.create = function(req, res) {
    var simulation = db.helpers.createSimulation({
        name: req.body.name,
        countriesSize: req.body.perteam
    });
    db.helpers.createResolution(simulation, {
        title: req.body.title,
        content: req.body.content
    });
    res.redirect('/');
};

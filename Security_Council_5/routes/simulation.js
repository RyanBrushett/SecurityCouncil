var db = require('../db');

exports.view = function(req, res) {
    res.render('simulation/new');
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

var db = require('../db');

exports.dashboard = function(req, res) {
    res.render('moderator/dashboard', {
        simulations: db.simulations
    });
};

exports.simulation = function(req, res) {
    var simulation = db.simulations[req.params.sid];
    simulation.sid = simulation.getId();
    res.render('moderator/simulation', simulation);
};

exports.country = function (req, res) {
    var simulation = db.simulations[req.params.sid];
    var countries = simulation.getCountries();
    var country = countries[req.params.cid];
    res.render('moderator/country', {
        ambassador: country.getAmbassador(),
        members: country.getMembers(),
        name: country.getName(),
        simulation: simulation
    });
};

var db = require('../db');

exports.dashboard = function(req, res) {
    res.render('moderator/dashboard', {
        simulations: db.simulations,
        user: db.users[req.session.userId]
    });
};

exports.simulation = function(req, res) {
    var simulation = db.simulations[req.params.sid];
    res.render('moderator/simulation', {
        simulation: simulation,
        user: db.users[req.session.userId]
    });
};

exports.country = function (req, res) {
    var user = db.users[req.session.userId];
    var simulation = db.simulations[req.params.sid];
    var countries = simulation.countries;
    var country = countries[req.params.cid];
    res.render('moderator/country', {
        ambassador: country.ambassador,
        members: country.members,
        name: country.name,
        countryId: country.id,
        simulation: simulation,
        positionPaper: country.positionPaper,
        positionPaperVisible: simulation.paperIsViewable,
        directives: country.directives,
        user: user
    });
};

exports.submit = function (req, res) {
    var simulationId = req.params.sid;
    var resolutionContent = req.body["resolution"];
    var simulation = db.simulations[simulationId];
    simulation.resolution.content = resolutionContent;
    res.redirect('/moderator/simulation/' + simulationId);
};

exports.chairperson = function (req, res) {
    var simulationId = req.params.sid;
    var chairpersonId = req.body["chairperson"];
    var simulation = db.simulations[simulationId];
    var chairperson = db.users[chairpersonId];
    db.helpers.setChairperson(simulation, chairperson);
    res.redirect('/moderator/simulation/' + simulationId);
};

exports.ambassador = function (req, res) {
    var simulationId = req.params.sid;
    var countryId = req.params.cid;
    var country = db.simulations[simulationId].countries[countryId];
    var ambassadorId = req.body["ambassador"];
    var ambassador = db.users[ambassadorId];
    country.ambassador = ambassador;
    res.redirect('/moderator/simulation/' + simulationId + '/' + countryId);
};

exports.positionPaperVisible = function (req, res) {
    var simulationId = req.params.sid;
    var simulation = db.simulations[simulationId];
    simulation.paperIsViewable = (req.body["paperIsVisible"] == "visible");
    res.redirect('/moderator/simulation/' + simulationId);
};

exports.directives = function (req, res) {
    var simulationId = req.params.sid;
    var countryId = req.params.cid;
    var country = db.simulations[simulationId].countries[countryId];
    country.directives = req.body["directives"];
    res.redirect('/moderator/simulation/' + simulationId + '/' + countryId);
};

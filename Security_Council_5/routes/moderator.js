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
        countryId: country.getId(),
        simulation: simulation,
        positionPaper: country.getPositionPaper(),
        positionPaperSummary: country.getPositionPaperSummary(),
        positionPaperVisible: simulation.isPaperVisible(),
        directives: country.getDirectives()
    });
};

exports.submit = function (req, res) {
    var simulationId = req.params.sid;
    var resolutionContent = req.body["resolution"];
    var simulation = db.simulations[simulationId];
    simulation.getResolution().setContent(resolutionContent);
    res.redirect('/moderator/simulation/' + simulationId);
};

exports.chairperson = function (req, res) {
    var simulationId = req.params.sid;
    var chairpersonId = req.body["chairperson"];
    var simulation = db.simulations[simulationId];
    var chairperson = db.users[chairpersonId];
    simulation.setChairperson(chairperson);
    res.redirect('/moderator/simulation/' + simulationId);
};

exports.ambassador = function (req, res) {
    var simulationId = req.params.sid;
    var simulation = db.simulations[simulationId];
    var countryId = req.params.cid;
    var countries = simulation.getCountries();
    var country = countries[countryId];
    var ambassadorId = req.body["ambassador"];
    var ambassador = db.users[ambassadorId];
    country.setAmbassador(ambassador);
    res.redirect('/moderator/simulation/' + simulationId + '/' + countryId);
};

exports.positionPaperVisible = function (req, res) {
    var simulationId = req.params.sid;
    var simulation = db.simulations[simulationId];
    var isVisibleInput = req.body["paperIsVisible"];
    var paperIsVisible;
    if (isVisibleInput == "visible") {
        paperIsVisible = true;
    }
    else paperIsVisible = false;
    simulation.setPaperVisible(paperIsVisible);
    res.redirect('/moderator/simulation/' + simulationId);
};

exports.directives = function (req, res) {
    var simulationId = req.params.sid;
    var countryId = req.params.cid;
    var simulation = db.simulations[simulationId];
    var countries = simulation.getCountries();
    var country = countries[countryId];
    var directives = req.body["directives"];
    country.setDirectives(directives);
    res.redirect('/moderator/simulation/' + simulationId + '/' + countryId);
}

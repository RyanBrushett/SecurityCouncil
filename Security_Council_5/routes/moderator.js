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

exports.create = function (req, res) {
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    
    var moderator = db.helpers.createModerator({
        name: name,
        username: username,
        password: password
    });
    
    res.redirect('/moderator/dashboard');
};

exports.viewCreate = function (req, res) {
    res.render('moderator/createmod', {
        user: db.users[req.session.userId]
    });
};

exports.metricsPage = function (req, res) {
    var simulation = db.simulations[req.params.sid];
    var totalComments = simulation.comments.length;
    var numTeams = simulation.countries.length;
    var numUsers = 0;
    var numMotions = simulation.motions.length;
    for (var i = 0; i < numTeams; i++) {
        var country = simulation.countries[i];
        for (var j = 0; j < country.members.length; j++) {
            numUsers++;
        }
    }
    
    res.render('moderator/metricsdash', {
        user : db.users[req.session.userId],
        simId : simulation.id,
        simulation : simulation,
        simName : simulation.name,
        totalComments : totalComments,
        numTeams : numTeams,
        numUsers : numUsers,
        numMotions : numMotions
    });
};

exports.metricsPageByUser = function (req, res) {
    var simulation = db.simulations[req.params.sid];
    var totalComments = simulation.comments.length;
    var numTeams = simulation.countries.length;
    var numUsers = 0;
    var users = [];
    for (var i = 0; i < numTeams; i++) {
        var country = simulation.countries[i];
        for (var j = 0; j < country.members.length; j++) {
            numUsers++;
            var tempUser = country.members[j];
            tempUser.teamname = country.name;
            tempUser.numberOfComments = 0;
            users.push(tempUser);
        }
    }
    for (var i = 0; i < totalComments; i++) {
        for (var j = 0; j < users.length; j++) {
            if (simulation.comments[i].user.id === users[j].id) {
                users[j].numberOfComments += 1;
            }
        }
    }
    
    res.render('moderator/usermetrics', {
        user : db.users[req.session.userId],
        users : users,
        simId : simulation.id,
        simulation : simulation,
        simName : simulation.name,
        totalComments : totalComments,
        numTeams : numTeams,
        numUsers : numUsers
    });
};

exports.metricsPageByTeam = function (req, res) {
    var simulation = db.simulations[req.params.sid];
    var totalComments = simulation.comments.length;
    var numTeams = simulation.countries.length;
    var numUsers = 0;
    var users = [];
    for (var i = 0; i < numTeams; i++) {
        var country = simulation.countries[i];
        for (var j = 0; j < country.members.length; j++) {
            numUsers++;
            var tempUser = country.members[j];
            tempUser.teamname = country.name;
            tempUser.numberOfComments = 0;
            users.push(tempUser);
        }
    }
    for (var i = 0; i < totalComments; i++) {
        for (var j = 0; j < users.length; j++) {
            if (simulation.comments[i].user.id === users[j].id) {
                users[j].numberOfComments += 1;
            }
        }
    }
    for (var i = 0; i < numTeams; i++) {
        var country = simulation.countries[i];
        country.comments = 0;
        for (var j = 0; j < users.length; j++) {
            if (country.name === users[j].teamname) {
                country.comments += users[j].numberOfComments;
            }
        }
    }
    
    res.render('moderator/teammetrics', {
        user : db.users[req.session.userId],
        users : users,
        simId : simulation.id,
        simulation : simulation,
        simName : simulation.name,
        totalComments : totalComments,
        numTeams : numTeams,
        numUsers : numUsers
    });
};
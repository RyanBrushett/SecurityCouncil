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
    db.helpers.setChairperson(simulationId, chairpersonId);
    res.redirect('/moderator/simulation/' + simulationId);
};

exports.ambassador = function (req, res) {
    var simulationId = req.params.sid;
    var countryId = req.params.cid;
    var country = db.simulations[simulationId].countries[countryId];
    var ambassadorId = req.body["ambassador"];
    var ambassador = db.users[ambassadorId];
    country.ambassador = ambassador;
    db.helpers.addAndPruneAmbassadors(db.simulations[simulationId], country);
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
    
    for (var i = 0; i < db.simulations.length; i++) {
        for (var j = 0; j < db.simulations[i].communicationChannels.length; j++) {
            db.helpers.addUserToChannel(db.simulations[i].communicationChannels[j], moderator);
        }
    }

    res.redirect('/moderator/dashboard');
};

exports.viewCreate = function (req, res) {
    res.render('moderator/createmod', {
        user: db.users[req.session.userId]
    });
};

exports.metricsPage = function (req, res) {
    var simulation = db.simulations[req.params.sid];
    var totalCommChannels = simulation.communicationChannels.length;
    var commChannels = simulation.communicationChannels;
    var numTeams = simulation.countries.length;
    var numUsers = 0;
    var motions = simulation.motions;
    var numMotions = motions.length;
    var totalComments = 0;
    var inDebate = 0;
    var inVote = 0;
    var numApproved = 0;
    var numDenied = 0;
    var numDeleted = 0;
    var users = [];
    for (var i = 0; i < numTeams; i++) {
        var _country = simulation.countries[i];
        for (var j = 0; j < _country.members.length; j++) {
            numUsers++;
            var _tempUser = _country.members[j];
            _tempUser.teamname = _country.name;
            _tempUser.numberOfComments = 0;
            users.push(_tempUser);
        }
    }
    
    // gross
    commChannels.forEach(function(commChannel){
        for (var i = 0; i < commChannel.comments.length; i++){
            for (var j = 0; j < users.length; j++) {
                if (commChannel.comments[i].user.id === users[j].id) {
                    users[j].numberOfComments += 1;
                    totalComments += 1;
                }
            }
        }
    });
    for (var i = 0; i < numTeams; i++) {
        var _country = simulation.countries[i];
        _country.comments = 0;
        _country.numMotions = 0;
        _country.motionsApproved = 0;
        _country.motionsDenied = 0;
        _country.motionsDeleted = 0;
        for (var j = 0; j < users.length; j++) {
            if (_country.name === users[j].teamname) {
                _country.comments += users[j].numberOfComments;
            }
        }
    }
    for (var i = 0; i < numMotions; i++) {
        var _motion = simulation.motions[i];
        for (var j = 0; j < numTeams; j++) {
            if (_motion.mover.id === simulation.countries[j].id) {
                var _country = simulation.countries[j];
                _country.numMotions += 1;
                if (_motion.isApproved) {
                    _country.motionsApproved += 1;
                } else if (_motion.isDenied) {
                    _country.motionsDenied += 1;
                } else if (_motion.isDeleted) {
                    _country.motionsDeleted += 1;
                } else {
                    continue;
                }
            }
        }
    }
    for (var i = 0; i < numMotions; i++) {
        if (motions[i].inDebate) {
            inDebate++;
        } else if (motions[i].inVote) {
            inVote++;
        } else if (motions[i].isApproved) {
            numApproved++;
        } else if (motions[i].isDenied) {
            numDenied++;
        } else if (motions[i].isDeleted) {
            numDeleted++;
        } else {
            continue;
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
        numMotions : numMotions,
        indebate : inDebate,
        invote : inVote,
        numapproved : numApproved,
        numdenied : numDenied,
        numdeleted : numDeleted,
        totalMotions : numMotions,
        motions : motions,
        users : users,
    });
};
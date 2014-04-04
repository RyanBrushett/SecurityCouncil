var path = require('path');
var db = require('../db');
var Motion = require('../models/motion');

exports.create = function(req, res) {
    var p1 = req.param('p1');
    var p2 = req.param('p2');
    var p3 = req.param('p3');
    req.session.lerror = undefined;
    req.session.rerror = undefined;
    if (!req.param('name')) {
        req.session.rerror = 'Name cannot be empty';
        res.redirect('/signup');
    } else if (req.param('password').trim() === '') {
        req.session.rerror = 'Your password cannot be empty';
        res.redirect('/signup');
    } else if (req.param('password') !== req.param('confirmpass')) {
        req.session.rerror = 'Passwords do not match';
        res.redirect('/signup');
    } else if (p1 === p2 || p1 === p3 || p2 === p3) {
        req.session.rerror = 'You selected the same country multiple times';
        res.redirect('/signup');
    } else {
        req.session.user = req.session.regenerate(function() {
            var user = db.helpers.createUser({
                name: req.param('name'),
                password: req.param('password'),
                preferences: [p1, p2, p3],
                username: req.param('name').toLowerCase()
            });
            req.session.userId = user.id;
            res.redirect('/');
        });
    }
};

exports.dashboard = function(req, res) {
    var simulationsJoined = [];
    var simulationsNotJoined = [];
    db.simulations.forEach(function (simulation) {
        var inSimulation = simulation.countries.some(function (country) {
            return country.members.some(function (member) {
                return member.id == req.session.userId;
            });
        });
        var list = inSimulation ? simulationsJoined : simulationsNotJoined;
        list.push(simulation);
    });
    res.render('participant/dashboard', {
        joinedSimulations: simulationsJoined,
        notJoinedSimulations: simulationsNotJoined,
        user: db.users[req.session.userId]
    });
};

exports.simulation = function(req, res) {
    var user = db.users[req.session.userId];
    var simulation = db.simulations[req.params.sid];
    var country;
    var joined = false;
    var i, j;
    
    for (i = 0; i < simulation.countries.length; i++) {
        for (j = 0; j < simulation.countries[i].members.length; j++) {
            if(simulation.countries[i].members[j].id == user.id){
                country = simulation.countries[i];
                joined = true;
            }
        }
    }
    
    db.helpers.setUserFlag(simulation, user);
    
    res.render('participant/simulation', {
        currentUser: user,
        isChair: (simulation.chairperson && simulation.chairperson.id === user.id),
        simulation: simulation,
        country: country,
        simulationJoined: joined
    });
};

exports.chair = function(req, res) {
    var user = db.users[req.session.userId];
    var simulation = db.simulations[req.params.sid];
    
    res.render('participant/chair', {
        canVoteResolution: (simulation.motions.length === 0),
        currentUser: user,
        simulation: simulation
    });
};

exports.debateMotion = function(req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.userId];

    var i, m, motion;
    for (i = 0; i < simulation.motions.length; i++) {
        m = simulation.motions[i];
        if (simulation.motions[i].id === req.body.motionId) {
            m.inDebate = true;
            m.inVote = false;
            motion = m;
        }
        else {
            if (m.inVote) {
                m.votes = [];
            }
            
            m.inDebate = false;
            m.inVote = false;
            motion = m;
        }
    }
    simulation.resolution.inDebate = false;
    var newComment = db.helpers.createComment(simulation.communicationChannels[0], {
        content: 'New motion under debate!\n' + motion.body + '\n' + 'Moved by: ' + motion.mover.name + '\n',
        user: user
    });
    db.helpers.setCommentFlag(simulation, newComment, simulation.chairperson);
    res.send(200);
};

exports.debateResolution = function(req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.userId];
   
    for (var i = 0; i < simulation.motions.length; i++) {
        var m = simulation.motions[i];
        m.inDebate = false;
        m.inVote = false;
    }
    
    if (simulation.resolution.inVote) {
        simulation.resolution.votes = [];
    }
    
    simulation.resolution.inDebate = true;
    simulation.resolution.inVote = false;
    var newComment = db.helpers.createComment(simulation.communicationChannels[0], {
        content: 'Resolution is now up for debate!',
        user: user
    });
    db.helpers.setCommentFlag(simulation, newComment, simulation.chairperson);
    res.send(200);
};

exports.voteMotion = function(req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.userId];

    var motion;
    for (var i = 0; i < simulation.motions.length; i++) {
        var m = simulation.motions[i];
        if (m.id === req.body.motionId) {
            m.inVote = true;
            m.inDebate = false;
            motion = m;
            for (var j = 0; j < simulation.countries.length - 1; j++) {
                var v = Math.floor(Math.random() * 3 + 1);
                db.helpers.createVote(motion, {
                    vote: v,
                    user: undefined
                });
            }
        }
        else {
            m.inDebate = false;
            m.inVote = false;
            motion = m;
        }
    }
    simulation.resolution.inDebate = false;
    var newComment = db.helpers.createComment(simulation.communicationChannels[0], {
        content: 'Motion open for voting!\n' + motion.body + '\nMoved by: ' + motion.mover.name,
        user: user
    });
    db.helpers.setCommentFlag(simulation, newComment, simulation.chairperson);
    res.send(200);
};

exports.voteResolution = function(req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.userId];
    var resolution = simulation.resolution;

    resolution.inDebate = false;
    resolution.inVote = true;
    // TEMP
    for (var j = 0; j < simulation.countries.length - 1; j++) {
        var v = Math.floor(Math.random() * 3 + 1);
        db.helpers.createVote(resolution, {
            vote: v,
            user: undefined
        });
    }
    var newComment = db.helpers.createComment(simulation.communicationChannels[0], {
        content: 'Resolution open for voting!',
        user: user
    });
    db.helpers.setCommentFlag(simulation, newComment, user);

    res.send(200);
};

exports.deleteMotion = function(req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.userId];
    for (var i = 0; i < simulation.motions.length; i++) {
        var m = simulation.motions[i];
        if(simulation.motions[i].id === req.body.motionId) {
            simulation.motions[i].isDeleted = true;
            simulation.motions[i].inVote = false;
            simulation.motions[i].inDebate = false;
            simulation.motions[i].isApproved = false;
            simulation.motions[i].isDenied = false;
            break;
        }
    }
    
    var isLast = false;
    
    var motionsClear = true;
    for (var i = 0; i < simulation.motions.length; i++) {
        if (simulation.motions[i].isDeleted !== true) {
            motionsClear = false;
        }
    }
    
    if (motionsClear) {
        isLast = true;
        simulation.resolution.inDebate = true;
    }
    res.send(200, {isLast: isLast});
};

exports.country = function(req, res) {
    var user = db.users[req.session.userId];
    var simulation = db.simulations[req.params.sid];
    var countries = simulation.countries;
    var country = simulation.countries[req.params.cid];
    var userIsMember = db.helpers.userIsMemberOfCountry(country, user);
    var userIsAmbassador = db.helpers.userIsAmbassadorOfCountry(country, user);
    var userCountry;
    var plainTextPP = false;
    if (typeof country.positionPaper != 'undefined') {
        if (country.positionPaper.file === null){
            plainTextPP = true;
        }
    }
    
    for (var i = 0; i < countries.length; i++) {
        for (var j = 0; j < countries[i].members.length; j++) {
            if (user.id === countries[i].members[j].id) {
                userCountry = countries[i];
            }
        }
    }
    
    res.render('participant/country', {
        ambassador: country.ambassador,
        members: country.members,
        name: country.name,
        simulation: simulation,
        simulationId: simulation.id,
        user: user,
        country: userCountry,
        userIsMember: userIsMember,
        countryId: country.id,
        positionPaper: country.positionPaper,
        plainTextPP: plainTextPP,
        positionPaperVisible: simulation.paperIsViewable,
        directives: country.directives,
        userIsAmbassador: userIsAmbassador
    });
};

exports.ambassador = function(req, res) {
    var user = db.users[req.session.userId];
    var simulationId = req.params.sid;
    var simulation = db.simulations[simulationId];
    var countryId = req.params.cid;
    var ambassadorId = req.body["ambassador"];
    var ambassador = db.users[ambassadorId];
    db.helpers.updateAmbassador(simulation, simulation.countries[countryId], user, ambassador.name);
    res.redirect('/participant/simulation/' + simulationId + '/' + countryId);
};

exports.join = function(req, res) {
    var user = db.users[req.session.userId];
    var simulation = db.simulations[req.params.sid];
    db.helpers.addUserToSimulation(simulation, user);
    res.redirect('/participant/simulation/' + req.params.sid);
};

exports.submit = function(req, res) {
    var simulationId = req.params.sid;
    var countryId = req.params.cid;
    var simulation = db.simulations[simulationId];
    var country = simulation.countries[countryId];
    var positionPaper = req.files["position-paper"];
    if (positionPaper.size > 0 && positionPaper.name) {
        db.helpers.setPositionPaper(country, {
            summary: req.body["position-paper-summary"],
            file: path.basename(positionPaper.path)
        });
    } else if (req.body["position-paper-summary"]) {
        db.helpers.setPositionPaperPlainText(country, req.body["position-paper-summary"]);
    }
    res.redirect('/participant/simulation/' + simulationId + '/' + countryId);
};

exports.createMotion = function(req, res) {
    var simulation = db.simulations[req.params.sid];
    var countries = simulation.countries;
    var country = simulation.countries[req.params.cid];
    db.helpers.createMotion(simulation, {
        mover: countries[req.params.cid],
        body: req.body.motion
    });
    res.redirect('/participant/simulation/' + req.params.sid + '/' + req.params.cid);
};

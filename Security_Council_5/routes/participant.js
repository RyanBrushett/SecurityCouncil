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
    /*var joined = simulation.countries.some(function (country) {
        return (country.members.indexOf(user) >= 0);
    });*/
    var joined = false;
    for(var i = 0; i < simulation.countries.length; i++){
        for(var j = 0; j < simulation.countries[i].members.length; j++){
            if(simulation.countries[i].members[j] == user){
                joined = true;
            }
        }
    }
    res.render('participant/simulation', {
        currentUser: user,
        isChair: (simulation.chairperson === user),
        simulation: simulation,
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
    user.flag = 'united-nations.svg';
    var motion;
    for (var i = 0; i < simulation.motions.length; i++) {
        var m = simulation.motions[i];
        if (simulation.motions[i].is === req.body.motionId) {
            m.status = Motion.Status.DEBATE;
            motion = m;
        }
        else {
            m.status = Motion.Status.TABLE;
            motion = m;
        }
    }
    simulation.resolution.inDebate = false;
    db.helpers.createComment(simulation, {
        content: 'New motion under debate!\n' + motion.body + '\n' + 'Moved by: ' + motion.mover.name + '\n',
        user: user
    });
};

exports.debateResolution = function(req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.userId];
    user.flag = 'united-nations.svg';
    for (var i = 0; i < simulation.motions.length; i++) {
        var m = simulation.motions[i];
        m.status = Motion.Status.TABLE;
    }
    simulation.resolution.inDebate = true;
    simulation.resolution.inVote = false;
    var newComment = db.helpers.createComment(simulation, {
        content: 'Resolution is now up for debate!',
        user: user
    });
};

exports.voteMotion = function(req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.userId];
    user.flag = 'united-nations.svg';
    var motion;
    for (var i = 0; i < simulation.motions.length; i++) {
        var m = simulation.motions[i];
        if (m.id === req.body.motionId) {
            m.status = Motion.Status.VOTE;
            motion = m;
            for (var j = 0; j < simulation.countries.length - 1; j++) {
                var v = Math.floor(Math.random() * 3 + 1);
                db.createVote(motion, {
                    vote: v,
                    user: undefined
                });
            }
        }
        else {
            m.status = Motion.Status.TABLE;
            motion = m;
        }
    }
    simulation.resolution.setInDebate = false;
    db.helpers.createComment(simulation, {
        content: 'Motion open for voting!' + motion.body + '\nMoved by: ' + motion.mover.name,
        user: user
    });
};

exports.voteResolution = function(req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.userId];
    var resolution = simulation.resolution;
    user.flag = 'united-nations.svg';
    resolution.inDebate = false;
    resolution.inVote = true;
    // TEMP
    for (var j = 0; j < simulation.countries.length - 1; j++) {
        var v = Math.floor(Math.random() * 3 + 1);
        db.createVote(resolution, {
            vote: v,
            user: undefined
        });
    }
    db.helpers.createComment(simulation, {
        content: 'Resolution open for voting!',
        user: user
    });
};

exports.deleteResolution = function(req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.userId];
    for (var i = 0; i < simulation.motions.length; i++) {
        var m = simulation.motions[i];
        if(simulation.motions[i].id === req.body.motionId) {
            simulation.motions.splice(i, 1);
            break;
        }
    }
};

exports.country = function(req, res) {
    var user = db.users[req.session.userId];
    var simulation = db.simulations[req.params.sid];
    var country = simulation.countries[req.params.cid];
    var countryMembers = country.members;
    var userIsMember = (countryMembers.indexOf(user) >= 0);
    var userIsAmbassador = (country.ambassador && (country.ambassador.id === user.id));
    res.render('participant/country', {
        ambassador: country.ambassador,
        members: countryMembers,
        name: country.name,
        simulation: simulation,
        simulationId: simulation.id,
        user: user,
        userIsMember: userIsMember,
        countryId: country.id,
        positionPaper: country.positionPaper,
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
    user.setAmbassadorPreference(ambassador.name);
    db.helpers.updateAmbassador(simulation.countries[countryId]);
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

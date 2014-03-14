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
            req.session.userId = user.getId();
            res.redirect('/');
        });
    }
};

exports.dashboard = function(req, res) {
    var i;
    var simulations = db.simulations;
    var simulationsJoined = [];
    var simulationsNotJoined = [];
    var user = db.users[req.session.userId];
    for (i = 0; i < simulations.length; i++) {
        // Check if user in simulation
        var simulation = simulations[i];
        var countries = simulation.getCountries();
        var j;
        var userInSimulation = false;
        for (j = 0; j < countries.length; j++) {
            if (countries[j].getMembers().indexOf(user) >= 0) {
                userInSimulation = true;
                break;
            }
        }
        if (userInSimulation) {
            simulationsJoined.push(simulation);
        } else {
            simulationsNotJoined.push(simulation);
        }
    }
    res.render('participant/dashboard', {
        user: user,
        joinedSimulations: simulationsJoined,
        notJoinedSimulations: simulationsNotJoined,
    });
};

exports.simulation = function(req, res) {
    var user = db.users[req.session.userId];
    var simulation = db.simulations[req.params.sid];
    simulation.sid = req.params.sid;
    simulation.joined = simulation.getCountries().some(function (country) {
        var members = country.getMembers();
        return (members.indexOf(user) >= 0);
    });
    simulation.username = user.getName();
    
    simulation.isChair = false;
    if(simulation.getChairperson() === user){
        simulation.isChair = true;
    }
    
    res.render('participant/simulation', simulation);
};

exports.chair = function(req, res) {
    var user = db.users[req.session.userId];
    var simulation = db.simulations[req.params.sid];
    simulation.username = user.getName();
    simulation.userId = user.getId();
    simulation.sid = req.params.sid;
    
    simulation.isChair = false;
    if(simulation.getChairperson() === user){
        simulation.isChair = true;
    }    
    
    simulation.canVoteResolution = false;
    if(simulation.getMotions().length === 0){
        simulation.canVoteResolution = true;
    }
    
    res.render('participant/chair', simulation);
};

exports.debateMotion = function(req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.userId];
    user.setFlag('united-nations.svg');
    
    for(var i = 0; i < simulation.getMotions().length; i++){
        var m = simulation.getMotions()[i];
        
        if(simulation.getMotions()[i].getId() === req.body.motionId){
            m.setStatus(Motion.Status.DEBATE);
        }
        else{
            m.setStatus(Motion.Status.TABLE);
        }
    }
    
    simulation.getResolution().setInDebate(false);
    
    var commentContent = "New motion under debate! <br />";
    commentContent += simulation.getMotions()[req.body.motionId].getBody() + "<br />";
    commentContent += "Moved by: " + simulation.getMotions()[req.body.motionId].getMover().getName() + "<br />";
    
    var newComment = db.helpers.createComment(simulation, {
        content: commentContent,
        user: user
    });
    simulation.addComment(newComment);
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end();
};

exports.debateResolution = function(req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.userId];
    user.setFlag('united-nations.svg');
    
    for(var i = 0; i < simulation.getMotions().length; i++){
        var m = simulation.getMotions()[i];
        
        m.setStatus(Motion.Status.TABLE);
    }
    
    simulation.getResolution().setInDebate(true);
    simulation.getResolution().setInVote(false);
    
    var commentContent = "Resolution is now up for debate! <br />";
    
    var newComment = db.helpers.createComment(simulation, {
        content: commentContent,
        user: user
    });
    simulation.addComment(newComment);    
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end();    
};

exports.voteMotion = function(req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.userId];
    user.setFlag('united-nations.svg');
    
    for(var i = 0; i < simulation.getMotions().length; i++){
        var m = simulation.getMotions()[i];
        
        if(m.getId() === req.body.motionId){
            m.setStatus(Motion.Status.VOTE);
            //simulation.getMotions()[i] = m;
            
            //TEMP
            var votes = m.getVotes();
            for(var j = 0; j < simulation.getCountries().length - 1; j++){
                var v = Math.floor(Math.random()*3 + 1);

                var vote = {
                    vote: v,
                    user: undefined
                };
                votes.push(vote);
            }
            m.setVotes(votes);
        }
        else{
            m.setStatus(Motion.Status.TABLE);
        }
    }
    
    simulation.getResolution().setInDebate(false);
    
    var commentContent = "Motion open for voting! <br />";
    commentContent += simulation.getMotions()[req.body.motionId].getBody() + "<br />";
    commentContent += "Moved by: " + simulation.getMotions()[req.body.motionId].getMover().getName() + "<br />";
    
    var newComment = db.helpers.createComment(simulation, {
        content: commentContent,
        user: user
    });
    simulation.addComment(newComment);
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end();    
};

exports.voteResolution = function(req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.userId];
    var resolution = simulation.getResolution();
    
    user.setFlag('united-nations.svg');
    
    resolution.setInDebate(false);
    resolution.setInVote(true);
    
    //TEMP
    var votes = resolution.getVotes();
    for(var j = 0; j < simulation.getCountries().length - 1; j++){
        var v = Math.floor(Math.random()*3 + 1);

        var vote = {
            vote: v,
            user: undefined
        };
        votes.push(vote);
    }
    resolution.setVotes(votes);
    
    var commentContent = "Resolution open for voting! <br />";
    
    var newComment = db.helpers.createComment(simulation, {
        content: commentContent,
        user: user
    });
    simulation.addComment(newComment);
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end();     
    
};

exports.country = function(req, res) {
    var user = db.users[req.session.userId];
    var simulation = db.simulations[req.params.sid];
    var countries = simulation.getCountries();
    var country = countries[req.params.cid];
    var countryMembers = country.getMembers();
    var userIsMember = (countryMembers.indexOf(user) >= 0);
    var positionPaperVisible = simulation.isPaperVisible();
    var userIsAmbassador = false;
    if (typeof country.getAmbassador() !== "undefined") {
        userIsAmbassador = (country.getAmbassador().getId() === user.getId());
    }
    res.render('participant/country', {
        ambassador: country.getAmbassador(),
        members: countryMembers,
        name: country.getName(),
        simulation: simulation,
        user: user,
        userIsMember: userIsMember,
        countryId: country.getId(),
        positionPaper: country.getPositionPaper(),
        positionPaperSummary: country.getPositionPaperSummary(),
        positionPaperVisible: simulation.isPaperVisible(),
        directives: country.getDirectives(),
        userIsAmbassador: userIsAmbassador
    });
};

exports.ambassador = function (req, res) {
	var user = db.users[req.session.userId];
    var simulationId = req.params.sid;
    var simulation = db.simulations[simulationId];
    var countryId = req.params.cid;
    var countries = simulation.getCountries();
    var country = countries[countryId];
    var ambassadorId = req.body["ambassador"];
    var ambassador = db.users[ambassadorId];
    user.setAmbassadorPreference(ambassador.getName());
    country.updateAmbassador();
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
    var positionPaperSummary = req.body["position-paper-summary"];
    var positionPaper = req.files["position-paper"];
    var simulation = db.simulations[simulationId];
    var country = simulation.getCountries()[countryId];
    country.setPositionPaperSummary(positionPaperSummary);
    if (positionPaper.size > 0 && positionPaper.name) {
        country.setPositionPaper(path.basename(positionPaper.path));
    }
    res.redirect('/participant/simulation/' + simulationId + '/' + countryId);
};

exports.createMotion = function(req, res) {
    var simulation = db.simulations[req.params.sid];
    var countries = simulation.getCountries();
    var country = simulation.getCountries()[req.params.cid];

    var motion = db.helpers.createMotion(simulation, {
        mover:countries[req.params.cid],
        body:req.body.motion
    });
    simulation.getMotions().push(motion);
    res.redirect('/participant/simulation/' + req.params.sid + '/' + req.params.cid);
};

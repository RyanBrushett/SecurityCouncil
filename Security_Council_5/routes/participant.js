var db = require('../db');

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
        joinedSimulations: simulationsJoined,
        notJoinedSimulations: simulationsNotJoined
    });
};

exports.simulation = function(req, res) {
    var user = db.users[req.session.userId];
    var simulation = db.simulations[req.params.sid];
    simulation.sid = req.params.sid;
    res.render('participant/simulation', simulation);
};

exports.country = function(req, res) {
    var user = db.users[req.session.userId];
    var simulation = db.simulations[req.params.sid];
    var countries = simulation.getCountries();
    var country = countries[req.params.cid];
    var countryMembers = country.getMembers();
    var userIsMember = (countryMembers.indexOf(user) >= 0);
    res.render('participant/country', {
        ambassador: country.getAmbassador(),
        members: countryMembers,
        name: country.getName(),
        simulation: simulation,
        userIsMember: userIsMember
    });
};

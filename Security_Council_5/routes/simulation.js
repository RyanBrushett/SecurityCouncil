var db = require('../db');

exports.view = function(req, res) {
    var currentUser = db.users[req.session.userId];
    res.render('simulation/new', {
        user: currentUser
    });
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
    var chan = db.helpers.createCommunicationChannel(simulation, {
        label: "Default", //I have no idea what to label the default channel -- Dan
        permissions: false
    });
    
    for (var i = 0; i < db.users.length; i++) {
        if (db.users[i].moderator === true) {
            db.helpers.addUserToChannel(chan, db.users[i]);
        }
    }
    
    res.redirect('/');
};

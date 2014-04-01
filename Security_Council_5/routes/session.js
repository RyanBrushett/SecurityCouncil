var db = require('../db');
var Moderator = require('../models/moderator');

exports.view = function(req, res) {
    res.render('lr', {
        countries: db.countries,
        lerror: req.session.lerror,
        rerror: req.session.rerror
    });
};

exports.redirect = function(req, res) {
    var user = db.users[req.session.userId];
    var prefix = user.moderator ? '/moderator/' : '/participant/';
    res.redirect(prefix + 'dashboard');
};

exports.require = function(req, res, next) {
    if (req.session.userId !== undefined) {
        next();
    } else {
        res.redirect('/login');
    }
};

exports.create = function(req, res) {
    var i;
    var password = req.body.password;
    var username = req.body.username;
    var users = db.users;
    var user;
    req.session.rerror = undefined;
    for (i = 0; i < users.length; i++) {     
        if (username === users[i].username && users[i].password === password) {
            user = users[i];
            break;
        }
    }
    if (!user) {
        req.session.lerror = 'Authentication failed';
        res.redirect('/login');
    } else {
        req.session.regenerate(function() {
            req.session.userId = user.id;
            res.redirect('/');
        });
    }
};

exports.restrictToModerator = function(req, res, next) {
    var user = db.users[req.session.userId];
    if (user.moderator) {
        next();
    } else {
        res.redirect('/participant/dashboard');
    }
};

exports.destroy = function(req, res) {
    req.session.destroy(function() {
        res.redirect('/login');
    });
};

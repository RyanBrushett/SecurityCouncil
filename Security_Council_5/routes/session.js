var db = require('../db');

exports.view = function(req, res) {
    res.render('lr', {
        countries: db.countries,
        lerror: req.session.lerror,
        rerror: req.session.rerror
    });
};

exports.redirect = function(req, res) {
    var user = db.users[req.session.userId];
    var prefix = (user.isModerator()) ? '/moderator/' : '/participant/';
    res.redirect(prefix + 'dashboard');
};

exports.require = function(req, res, next) {
    if (req.session.userId !== undefined) {
        next();
    } else {
        res.redirect('/login');
    }
};

exports.restrictToMod = function(req, res, next) {
    var user = db.users[req.session.userId];
    if (user.isModerator() == true) {
        next();
    } else {
        res.redirect('/participant/dashboard');
    }
};

exports.restrictToUser = function(req, res, next) {
    var user = db.users[req.session.userId];
    if (user.isModerator() == true) {
        res.redirect('/moderator/dashboard');
    } else {
        next();
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
        if (username == users[i].getUsername() && users[i].checkPassword(password)) {
            user = users[i];
            break;
        }
    }
    if (!user) {
        req.session.lerror = 'Authentication failed';
        res.redirect('/login');
    } else {
        req.session.regenerate(function() {
            req.session.userId = user.getId();
            res.redirect('/');
        });
    }
};

exports.destroy = function(req, res) {
    req.session.destroy(function() {
        res.redirect('/login');
    });
};

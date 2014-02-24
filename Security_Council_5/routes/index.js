var db = require('../tempdb');

exports.index = function(req, res) {
    res.render('index');
};

exports.login = function(req, res) {
    res.render('lr', {
        countries: db.members,
        lerror: req.session.error
    });
};

exports.loginUser = function(req, res) {
    var check = 0;
    var i;
    var name;
    var pass;
    var password = req.body.password;
    var permission;
    var user;
    var username = req.body.username;
    var users = db.users;
    for (i = 0; i < users.length; i++) {
        name = users[i].UserName;
        pass = users[i].Password;
        permission = users[i].Position;
        if (name === username && pass === password) {
            user = users[i];
            if (permission === 'member' || permission === 'ambassador') {
                check = 1;
            }
            if (permission === 'administrator') {
                check = 2;
            }
            break;
        }
    }
    if(check == 1){
        // Normal user
        req.session.regenerate(function() {
            req.session.user = user;
            req.session.success = 'Authenticated as ' + user.UserName;
            res.redirect('/');
        });
    } else if (check == 2){
        // Moderator (admin)
        req.session.regenerate(function(){
            req.session.user = user;
            req.session.success = 'Authenticated as ' + user.UserName;
            res.redirect('/sc-admin');
        });
    } else {
        req.session.error = 'Authentication failed';
        res.redirect('/login');
    }
};

exports.logout = function(req, res){
    req.session.destroy(function() {
        res.redirect('/login');
    });
};

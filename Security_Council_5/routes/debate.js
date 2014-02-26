var db = require('../db');

exports.view = function(req, res) {
    var simulation = db.simulations[req.params.id];
    var currentUser = db.users[req.session.userId];
    currentUser.flag = undefined;
    simulation.currentUser = currentUser;
    res.render('debate/index', simulation);
};

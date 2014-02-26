var db = require('../db');

exports.view = function(req, res) {
    var simulation = db.simulations[req.params.id];
    simulation.currentUser = db.users[req.session.userId];
    res.render('debate/index', simulation);
};

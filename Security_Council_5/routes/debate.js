var db = require('../db');

exports.view = function(req, res) {
    var simulation = db.simulations[req.params.id];
    res.render('debate/index', simulation);
};

var users = require('../db').users;

exports.getuserinfo = function(req, res){
    var username = req.param('username');
    //var template = "<ul>{{#sims}}<li>Name: {{name}}</li>{{/sims}}</ul>";
    //var compiled = Hogan.compile(template);
    //var html     = compiled.render(view);
    res.render('admin/userinfo');
};
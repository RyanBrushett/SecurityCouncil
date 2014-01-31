var users = require('../db').users;

exports.getuserinfo = function(req, res){
    var user = req.param('username');
    //var template = "<ul>{{#sims}}<li>Name: {{name}}</li>{{/sims}}</ul>";
    //var compiled = Hogan.compile(template);
    //var html     = compiled.render(view);
    res.render('admin/userinfo', {
        username: user
    });
};

exports.changeuserpassword = function(req, res){
    var user = req.param('username');
    var pass = req.param('password');
    
    for(var i=0; i<users.length; i++){
        if(users[i].username === user){
            users[i].password = pass;
        }
    }
    
    res.render('admin/manageusers', {
        title: 'User Management',
        userlist: users
    });    
}
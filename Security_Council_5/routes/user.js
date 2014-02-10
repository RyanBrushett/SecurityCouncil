var users = require('../tempdb').users;
var members = require('../tempdb').members;
var Hogan   = require('hjs');

exports.getuserinfo = function(req, res){
    var user = req.param('username');
    
    var pass = "";
    var selectedcountry = "";
    for(var i = 0; i < users.length; i++){
        if(users[i].UserName === user){
            pass = users[i].Password;
            selectedcountry = users[i].Country;
        }
    }
    
    var mbrkey = [];
    for(var i=0; i < members.length; i++){
        if(members[i] != selectedcountry){
            mbrkey.push({country:members[i]});
        }
    }
    
    var countryhtml = "<option value=\"" + selectedcountry +"\" selected>" + selectedcountry + "</option>";
    
    res.render('admin/userinfo', {
        username: user,
        password: pass,
        usercountry: countryhtml,
        teams: mbrkey
    });
};

exports.list = function(req, res){
  res.render("user");
};

exports.changeuserpassword = function(req, res){
    var user = req.param('username');
    var pass = req.param('password');
    
    for(var i=0; i<users.length; i++){
        if(users[i].UserName === user){
            users[i].Password = pass;
        }
    }
    res.render('admin/manageusers', {
        title: 'User Management',
        userlist: users
    });
};

exports.updateusersettings = function(req, res){
    var user = req.param('username');
    var team = req.param('team');
    
    for(var i = 0; i < users.length; i++){
        if(users[i].UserName === user){
            users[i].Country = team;
        }
    }
    
    res.render('admin/manageusers', {
        title: 'User Management',
        userlist: users
    });
};

exports.getUserRegistration = function(req,res){
    var errormsg;
    if (req.param('errormsg') === "badpass"){
        errormsg = "<h2>Your passwords did not match</h2>";
    } else if (req.param('errormsg') === "paramsmatch"){
        errormsg = "<h2>You selected the same country more than once</h2>";
    }
    var memberListDropDown;
    if (members.length === 0){
        memberListDropDown = "No Countries Added. See the Admin.";
    } else {
        var mbrkey = [];
        for(var i=0; i < members.length; i++){
            mbrkey.push({country:members[i]});
        }
        var viewMemberList  = {countries:mbrkey};
        var templateMembers = "{{#countries}}" +
                              "<option value=\"{{country}}\">" +
                              "{{country}}" +
                              "</option>" +
                              "{{/countries}}";
        var compiledMembers = Hogan.compile(templateMembers);
        memberListDropDown  = compiledMembers.render(viewMemberList);
    }
    res.render('admin/signup',{
        title:"Sign Up!",
        memberoptions:memberListDropDown,
        errormessage:errormsg
    });
};

exports.postUserRegistration = function(req,res){
    var pref1 = req.param('pref1');
    var pref2 = req.param('pref2');
    var pref3 = req.param('pref3');
    if (req.param('password') !== req.param('confirmpass')){
        var errormsg = "badpass";
        res.redirect('/signup?errormsg=' + errormsg);
    } else if(pref1 === pref2 || pref1 === pref3 || pref2 === pref3){
        var errormsg = "paramsmatch";
        res.redirect('/signup?errormsg=' + errormsg);
    } else {
        var idx = users.length;
        users.push({
            Id:idx,
            Name:req.param('fullname'),
            UserName:req.param('username'),
            Password:req.param('password'),
            Position:'member'
        });
        res.redirect('/login');
    }
};
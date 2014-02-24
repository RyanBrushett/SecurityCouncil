var rooms   = require('../tempdb').rooms;
var users   = require('../tempdb').users;
var members = require('../tempdb').members;
var resolutions = require('../tempdb').resolutions;
var Hogan   = require('hjs');

// sc-admin dash landing page
exports.getScAdmin = function(req,res){
    res.render('sc-admin', {
        title: 'Admin Dashboard',
        numusers: users.length,
        numsims: rooms.length,
        partials: {
            mainview: 'admin/dashboard'
        }
    });
};

// sc-admin handle get for sim manager
exports.getMakeSim = function(req,res){
    var adminlist = getAdminList();
    var adminListDropdown = "";
    if (adminlist.length === 0){
        adminListDropdown = "There are no admins!";
    } else {
        var viewAdmins     = {admins:adminlist};
        var templateAdmins = "{{#admins}}" +
                             "<option value=\"{{Name}}\">" +
                             "{{Name}}" +
                             "</option>" +
                             "{{/admins}}";
        var compiledAdmins = Hogan.compile(templateAdmins);
        adminListDropdown  = compiledAdmins.render(viewAdmins);
    }
    var html = "";
    if (rooms.length === 0){
        html = "There are currently no created simulations";
    } else {
        var view     = {sims:rooms};
        var template = "<dl class=\"roomlist\">{{#sims}}" +
                       "<dt class=\"roomname\">" +
                       "<a href=\"/sc-admin/managesim/{{name}}\">{{name}}</a>" +
                       "</dt>" +
                       "<dd class=\"roomprop\">ID: {{id}}</dd>" +
                       "<dd class=\"roomprop\">Admin: {{admin.Name}}</dd>" +
                       "<dd class=\"roomprop\">Sort: {{sort}}</dd>" +
                       "{{/sims}}</dl>";
        var compiled = Hogan.compile(template);
        html         = compiled.render(view);
    }
    res.render('sc-admin',{
        title:'Simulation Manager',
        roomlist:html,
        selectadminlist:adminListDropdown,
        partials: {
            mainview: 'admin/makesim'
        }
    });
};

// sc-admin handle post for sim manager
exports.postMakeSim = function(req,res){
    // Set ID of the room appropriately
    var idx;
    if (rooms.length <= 0){
        idx = 0;
    } else {
        idx = rooms.length;
    }

    // Fetch the list of users in the system
    var userlist = getUserList();

    // Get the admin user
    var adminUser;
    for (var i = 0; i < userlist.length; i++){
        if (userlist[i].Name === req.param('admin')){
            adminUser = userlist[i].clone();
        }
    }

    // Create the room
    var roomUserList = [];
    var room = {
        id:idx,
        name:req.param('room'),
        admin:adminUser,
        sort:req.param('teamsort'),
        users:roomUserList
    };
    rooms.push(room);

    // This stuff is for rendering the page correctly.
    var adminlist = getAdminList();
    var adminListDropdown = "";
    if (adminlist.length === 0){
        adminListDropdown = "There are no admins!";
    } else {
        var viewAdmins     = {admins:adminlist};
        var templateAdmins = "{{#admins}}" +
                             "<option value=\"{{Name}}\">" +
                             "{{Name}}" +
                             "</option>" +
                             "{{/admins}}";
        var compiledAdmins = Hogan.compile(templateAdmins);
        adminListDropdown  = compiledAdmins.render(viewAdmins);
    }
    var html = "";
    if (rooms.length === 0){
        html = "There are currently no created simulations";
    } else {
        var view     = {sims:rooms};
        var template = "<dl class=\"roomlist\">{{#sims}}" +
                       "<dt class=\"roomname\">" +
                       "<a href=\"/sc-admin/managesim/{{name}}\">{{name}}</a>" +
                       "</dt>" +
                       "<dd class=\"roomprop\">ID: {{id}}</dd>" +
                       "<dd class=\"roomprop\">Admin: {{admin.Name}}</dd>" +
                       "<dd class=\"roomprop\">Sort: {{sort}}</dd>" +
                       "{{/sims}}</dl>";
        var compiled = Hogan.compile(template);
        html         = compiled.render(view);
    }
    res.render('sc-admin',{
        title:'Simulation Manager',
        roomlist:html,
        selectadminlist:adminListDropdown,
        partials: {
            mainview: 'admin/makesim'
        }
    });
};

// sc-admin handle get for user manager
exports.getManageUsers = function(req,res){
    var usersInRoom = [];
    if(rooms === []){
        usersInRoom = [];
    }
    else{
        for(var i = 0; i < users.length; i++){
            for(var j = 0; j < users[i].scss.length; j++){
                if(users[i].scss[j] === 0){
                    usersInRoom.push(users[i]);
                }
            }
        }
    }

    res.render('sc-admin', {
        title : 'User Management',
        userlist: usersInRoom,
        roomlist: rooms,
        partials: {
            mainview: 'admin/manageusers'
        }
    });
};

// sc-admin handle post for user manager
exports.postManageUsers = function(req, res){
    // plain-text password for now
    var idx = users.length;
    users.push({
        Id: idx,
        Name: req.param('name'),
        UserName: req.param('username'),
        Password: req.param('password'),
        Country: "Not Assigned",
        Position: "member"
    });
    res.render('sc-admin', {
        title: 'User Management',
        userlist: users,
        partials: {
            mainview: 'admin/manageusers'
        }
    });
};

// sc-admin handle get for resolution manager
exports.getManageResolutions = function(req, res){
    res.render('sc-admin', {
        title : 'Resolution Management',
        resolutionlist: resolutions,
        partials: {
            mainview: 'admin/manageresolutions'
        },
        roomlist: rooms
    });
};

exports.restrict = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Function for shuffling an array in place
function shuffle(array){
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;
    while (0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Clone operation added to objects and arrays
Object.prototype.clone = function() {
    var newObj = (this instanceof Array) ? [] : {};
    for (i in this) {
        if (i == 'clone'){
            continue;
        }
        if (this[i] && typeof this[i] == "object") {
            newObj[i] = this[i].clone();
        } else {
            newObj[i] = this[i];
        }
    }
    return newObj;
};

// Function for returning the list of admins
function getAdminList(){
    var adminlist = [];
    var userlist = users.clone();
    for (var i = 0; i < userlist.length; i++){
        if (userlist[i].Position === 'administrator'){
            adminlist.push(userlist[i]);
        }
    }
    return adminlist;
}

// Function for returning the list of all users
function getUserList(){
    var userlist = [];
    var membs = [];
    if (users.length === 0){
        return userlist;
    }
    userlist = users.clone();
    userlist = shuffle(userlist);
    membs = members.clone();
    membs = shuffle(membs);
    var j = 0;
    for (var i = 0; i < userlist.length; i++){
        if (j >= membs.length) {
            j = 0;
        }
        userlist[i].Country = membs[j];
        j++;
    }
    return userlist;
}

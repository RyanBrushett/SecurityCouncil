var users = require('../tempdb').users;
var members = require('../tempdb').members;
var rooms = require('../tempdb').rooms;
var Hogan   = require('hjs');

var selectedRoom = 0;

function getRoomByName(roomName){
    for (var i = 0; i < rooms.length; i++){
        if (rooms[i].name === roomName){
            return rooms[i];
        }
    }
}

function getRoomById(roomId){
    for (var i = 0; i < rooms.length; i++){
        if (rooms[i].id === roomId){
            return rooms[i];
        }
    }
}

function renderUserManager(res, selectedRoom){
    //Fetch users belonging to a room
    var usersInRoom = [];
    if(rooms === []){
        usersInRoom = [];
    }
    else{
        for(var i = 0; i < users.length; i++){
            for(var j = 0; j < users[i].scss.length; j++){
                if(users[i].scss[j] == selectedRoom){
                    usersInRoom.push(users[i]);
                }
            }
        }
    }

    //Build a new roomlist, such that the currently selected room is first
    var roomListPartial = [];
    var selectedRoomId = -1;
    var selectedRoomName = "";

    for(var i = 0; i < rooms.length; i++){
        if(rooms[i].id != selectedRoom){
            roomListPartial.push(rooms[i]);
        }
        else{
            selectedRoomId = rooms[i].id;
            selectedRoomName = rooms[i].name;
        }
    }

    var roomhtml = "<option value=\"" + selectedRoomId +"\" selected>" + selectedRoomName + "</option>";

    res.render('sc-admin', {
        title : 'User Management',
        userlist: usersInRoom,
        roomlist: roomListPartial,
        selectedroom: roomhtml,
        partials: {
            mainview: 'admin/manageusers'
        }
    });
}

exports.getUserInfo = function(req, res){
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

exports.getUsersByRoom = function(req, res){
    selectedRoom = req.param('room');
    renderUserManager(res, selectedRoom);
};

exports.list = function(req, res){
  res.render("user");
};

exports.changeUserPassword = function(req, res){
    var user = req.param('username');
    var pass = req.param('password');

    for(var i=0; i<users.length; i++){
        if(users[i].UserName === user){
            users[i].Password = pass;
        }
    }

    renderUserManager(res, selectedRoom);
};

exports.updateUserSettings = function(req, res){
    var user = req.param('username');
    var team = req.param('team');

    for(var i = 0; i < users.length; i++){
        if(users[i].UserName === user){
            users[i].Country = team;
        }
    }

    renderUserManager(res, selectedRoom);
};

exports.getUserRegistration = function(req, res) {
    res.render('login', {
        countries: members,
        rerror: req.session.error
    });
};

exports.postUserRegistration = function(req, res) {
    var p1 = req.param('p1');
    var p2 = req.param('p2');
    var p3 = req.param('p3');
    if (req.param('password') !== req.param('confirmpass')) {
        req.session.error = 'Passwords do not match';
        res.redirect('/signup');
    } else if (p1 === p2 || p1 === p3 || p2 === p3) {
        req.session.error = 'You selected the same country multiple times';
        res.redirect('/signup');
    } else {
        req.session.user = {
            id: users.length,
            name: req.param('name'),
            username: req.param('username'),
            password: req.param('password'),
            position: 'member',
            country: 'Not Assigned',
            preferences: [p1, p2, p3]
        };
        users.push(req.session.user);
        res.redirect('/');
    }
};

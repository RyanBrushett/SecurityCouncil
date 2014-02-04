var express = require('express');
var http = require('http');
var path = require('path');

// Routes
var routes = require('./routes');
var admin = require('./routes/scadmin');
var user = require('./routes/user');
var room = require('./routes/rooms');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.bodyParser());
app.use(express.cookieParser('signature'));
app.use(express.session());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Root
app.get('/', admin.restrict, routes.index);
// Admin dashboard landing page (ideas?)
app.get('/sc-admin', admin.restrict, admin.getscadmin);
// Make simulation page get and post
app.get('/sc-admin/managesim', admin.restrict, admin.getmakesim);
app.post('/sc-admin/managesim', admin.restrict, admin.postmakesim);
app.get('/sc-admin/managesim/:name', admin.restrict, room.getroombyid);
// Users
app.get('/sc-admin/manageusers', admin.restrict, admin.getmanageusers);
app.post('/sc-admin/manageusers', admin.restrict, admin.postmanageusers);
app.post('/sc-admin/manageusers/getuserinfo', admin.restrict, user.getuserinfo);
app.post('/sc-admin/manageusers/changepassword/:username', admin.restrict, user.changeuserpassword);
app.post('/sc-admin/manageusers/updatesettings/:username', admin.restrict, user.updateusersettings);
// Rooms routes
app.get('/sim', admin.restrict, room.getallrooms);
app.get('/sim/:name', admin.restrict, room.joinroom);
// What does this line do?
require('./routes/chatService')(app);
// Session management
app.get('/login', routes.login);
app.post('/login', routes.loginUser);
app.get('/logout', admin.restrict, routes.logout);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

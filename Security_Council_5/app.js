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
app.get('/', routes.index);
// Admin dashboard landing page (ideas?)
app.get('/sc-admin', admin.getscadmin);
// Make simulation page get and post
app.get('/sc-admin/managesim', admin.getmakesim);
app.post('/sc-admin/managesim',admin.postmakesim);
app.get('/sc-admin/managesim/:name', room.getroombyid);
// Rooms routes
app.get('/sim',room.getallrooms);
app.get('/sim/:name',room.joinroom);
// Users
app.get('/sc-admin/manageusers', admin.getmanageusers);
app.post('/sc-admin/manageusers', admin.postmanageusers);
app.post('/sc-admin/manageusers/getuserinfo', user.getuserinfo);
app.post('/sc-admin/manageusers/changepassword/:username', user.changeuserpassword);
app.post('/sc-admin/manageusers/updatesettings/:username', user.updateusersettings);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

var express = require('express');
var http = require('http');
var path = require('path');

// Routes
var routes = require('./routes');
var admin = require('./routes/scadmin');
var user = require('./routes/user');
var room = require('./routes/rooms');
var resolution = require('./routes/resolution');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
// app.use(express.bodyParser()); Cleaning up launch warnings. This isn't needed.
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

//error settings
app.use(function(req,res){
	if (req.accepts('html')) {
	    res.render('error404', { url: req.url });
	    return;
	  }
});


/*
 * Note that any route that contains the admin.restrict function
 * is restricted. This function will not allow the use of that route
 * unless a session is created.
 * If you don't know a username, use:
 * username: ryanb
 * password: password
 */

// Root
app.get('/', admin.restrict, routes.index);

// Admin and sim management
app.get('/sc-admin', admin.restrict, admin.getScAdmin);
app.get('/sc-admin/managesim', admin.restrict, admin.getMakeSim);
app.post('/sc-admin/managesim', admin.restrict, admin.postMakeSim);
app.get('/sc-admin/managesim/:name', admin.restrict, room.getroombyid);

// Users
app.get('/sc-admin/manageusers', admin.restrict, admin.getManageUsers);
app.post('/sc-admin/manageusers', admin.restrict, admin.postManageUsers);
app.post('/sc-admin/manageusers/getusersbyroom', admin.restrict, user.getUsersByRoom);
app.post('/sc-admin/manageusers/getuserinfo', admin.restrict, user.getUserInfo);
app.post('/sc-admin/manageusers/changepassword/:username', admin.restrict, user.changeUserPassword);
app.post('/sc-admin/manageusers/updatesettings/:username', admin.restrict, user.updateUserSettings);
app.get('/signup', user.getUserRegistration);
app.post('/signup', user.postUserRegistration);

// Resolution manager
app.get('/sc-admin/manageresolutions', admin.restrict, admin.getManageResolutions);
app.post('/sc-admin/createresolution', admin.restrict, resolution.createResolution);
app.post('/sc-admin/manageresolutions/getresolutioninfo', admin.restrict, resolution.getresolutioninfo);
app.post('/sc-admin/manageresolutions/updateresolution/:id', admin.restrict, resolution.updateresolution);

app.get('/sc-admin/editResolution/:id', admin.restrict, resolution.editResolution);
app.get('/sc-admin/editClauses/:id', admin.restrict, resolution.editClauses);
app.post('/sc-admin/createClause', admin.restrict, resolution.createClause);
app.post('/sc-admin/createSubclause', admin.restrict, resolution.createSubclause);
app.post('/sc-admin/updateClause', admin.restrict, resolution.updateClause);
app.get('/sc-admin/getClause', admin.restrict, resolution.getClause);
app.post('/sc-admin/removeClause', admin.restrict, resolution.removeClause);

// Rooms routes
app.get('/sim', admin.restrict, room.getallrooms);
app.get('/sim/:name', admin.restrict, room.joinroom);

// Chat routes. See routes/chatService
require('./routes/chatService')(app);

// Session management
app.get('/login', routes.login);
app.post('/login', routes.loginUser);
app.get('/logout', admin.restrict, routes.logout);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});


/**
 * Module dependencies.
 */

var express = require('express');

/** 
 * I don't like how the routes are defined a bunch of times.
 * I think there's a way around this.
 * -Ryan 
 */
var routes = require('./routes');
var admin = require('./routes/scadmin');
var user = require('./routes/user');

var http = require('http');
var path = require('path');

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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/sc-admin', admin.getscadmin);
app.post('/sc-admin', admin.postscadmin);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

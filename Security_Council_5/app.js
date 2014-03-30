var express = require('express');
var http = require('http');
var path = require('path');
var database = require('./db');

// Routes
var debate = require('./routes/debate');
var moderator = require('./routes/moderator');
var participant = require('./routes/participant');
var session = require('./routes/session');
var simulation = require('./routes/simulation');

// Database
database.use(process.env.DB_FILE || 'wat.db');

// Express
var app = express();
app.set('port', process.env.PORT || 3333);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// Middleware
app.use(express.cookieParser('signature'));
app.use(express.session());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({
    keepExtensions: true,
    uploadDir: __dirname + '/public/uploads'
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.errorHandler());

// Error settings
app.use(function(req, res) {
    res.render('404', {url: req.url});
    return;
});

// Root
app.get('/', session.require, session.redirect);

// Session management
app.get('/login', session.view);
app.get('/logout', session.destroy);
app.post('/login', session.create);

// User registration
app.get('/signup', session.view);
app.post('/signup', participant.create);

// Simulation
app.get('/simulation/new', session.require, simulation.view);
app.post('/simulation/new', session.require, session.restrictToModerator, simulation.create);

// Moderator
app.get('/moderator/dashboard', session.require, session.restrictToModerator, moderator.dashboard);
app.get('/moderator/simulation/:sid', session.require, session.restrictToModerator, moderator.simulation);
app.get('/moderator/simulation/:sid/:cid', session.require, session.restrictToModerator, moderator.country);
app.post('/moderator/submit/:sid', session.require, session.restrictToModerator, moderator.submit);
app.post('/moderator/simulation/chairperson/:sid', session.require, session.restrictToModerator, moderator.chairperson);
app.post('/moderator/ambassador/:sid/:cid', session.require, session.restrictToModerator, moderator.ambassador);
app.post('/moderator/simulation/visible-paper/:sid', session.require, session.restrictToModerator, moderator.positionPaperVisible);
app.post('/moderator/directives/:sid/:cid', session.require, session.restrictToModerator, moderator.directives);
app.get('/moderator/create', session.require, session.restrictToModerator, moderator.viewCreate);
app.post('/moderator/create', session.require, session.restrictToModerator, moderator.create);

// Participant
app.get('/participant/dashboard', session.require, participant.dashboard);
app.get('/participant/simulation/:sid', session.require, participant.simulation);
app.get('/participant/simulation/:sid/:cid', session.require, participant.country);
app.get('/participant/join/simulation/:sid', session.require, participant.join);

// Participant -- Chair
app.get('/participant/chair/:sid', session.require, participant.chair);
app.post('/participant/chair/debate/motion', session.require, participant.debateMotion);
app.post('/participant/chair/debate/resolution', session.require, participant.debateResolution);
app.post('/participant/chair/vote/motion', session.require, participant.voteMotion);
app.post('/participant/chair/vote/resolution', session.require, participant.voteResolution);
app.post('/participant/chair/delete/motion', session.require, participant.deleteMotion);

// Participant -- Submit
app.post('/participant/submit/:sid/:cid', session.require, participant.submit);
app.post('/participant/submit/:sid/:cid/motion', session.require, participant.createMotion);

// Participant -- Ambassador
app.post('/participant/ambassador/:sid/:cid', session.require, participant.ambassador);

// Debate view
app.get('/debate/:id', session.require, debate.view);
app.post('/debate/:id', session.require, debate.comment);
app.post('/debate/vote/:sid/:mid', session.require, debate.vote);
app.post('/debate/vote/:sid', session.require, debate.voteResolution);
/* app.post('/debate/:id/:cid', session.require, session.restrictToModerator, debate.deleteComment); */

// Communication Channels
app.post('/debate/:id/communication/create', session.require, debate.createChannel);
app.post('/debate/:id/communication/delete', session.require, debate.deleteChannel);

// Create server
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

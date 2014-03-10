var express = require('express');
var http = require('http');
var path = require('path');

// Routes
var debate = require('./routes/debate');
var moderator = require('./routes/moderator');
var participant = require('./routes/participant');
var session = require('./routes/session');
var simulation = require('./routes/simulation');

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

// Development only
if (app.get('env') == 'development') {
    app.use(express.errorHandler());
}

// Error settings
app.use(function(req, res) {
    res.render('404', {
        url: req.url
    });
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
app.post('/simulation/new', session.require, simulation.create);

// Moderator
app.get('/moderator/dashboard', session.require, session.restrictToMod, moderator.dashboard);
app.get('/moderator/simulation/:sid', session.require, session.restrictToMod, moderator.simulation);
app.get('/moderator/simulation/:sid/:cid', session.require, session.restrictToMod, moderator.country);
app.post('/moderator/submit/:sid', session.require, session.restrictToMod, moderator.submit);
app.post('/moderator/simulation/chairperson/:sid', session.require, session.restrictToMod, moderator.chairperson);
app.post('/moderator/ambassador/:sid/:cid', session.require, session.restrictToMod, moderator.ambassador);
app.post('/moderator/simulation/visible-paper/:sid', session.require, session.restrictToMod, moderator.positionPaperVisible);
app.post('/moderator/directives/:sid/:cid', session.require, session.restrictToMod, moderator.directives);

// Participant
app.get('/participant/dashboard', session.require, session.restrictToUser, participant.dashboard);
app.get('/participant/simulation/:sid', session.require, session.restrictToUser, participant.simulation);
app.get('/participant/simulation/:sid/:cid', session.require, session.restrictToUser, participant.country);
app.get('/participant/join/simulation/:sid', session.require, session.restrictToUser, participant.join);
app.get('/participant/chair/:sid', session.require, session.restrictToUser, session.restrictToChair, participant.chair);
app.post('/participant/chair/debate/motion', session.require, session.restrictToUser, session.restrictToChair, participant.debateMotion);
app.post('/participant/chair/debate/resolution', session.require, session.restrictToUser, session.restrictToChair, participant.debateResolution);
app.post('/participant/submit/:sid/:cid', session.require, session.restrictToUser, participant.submit);
app.post('/participant/submit/:sid/:cid/motion', session.require, session.restrictToUser, participant.createMotion);

// Debate view
app.get('/debate/:id', session.require, debate.view);
app.post('/debate/:id', session.require, debate.comment);

// Create server
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

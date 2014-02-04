var db = require('../tempdb');
var Hogan = require('hjs');
var fs = require('fs');

var chat = function(app) {
    
    app.get('/sim/:name/chatroom', function(req, res) {
        res.render('chatroom', {
            title: 'United Nations Security Council'
                });
        //res.writeHead
        //res.send
    });
    
    app.get('/sim/:name/chatroom/speakersList', function(req, res) {
        //all speakers
        res.send(db.users);
    });
    
    app.get('/sim/:name/chatroom/clauseList', function(req, res) {
        var view     = {cls: db.clauses, sub: db.subclauses};
        var template = '<b>Preambulatory</b><ul>{{#cls}}<li><a href="#" onclick="getClause({{Id}})">Clause #{{Id}}</a></li>{{/cls}}</ul>';
        template += '<b>Operative</b><ul>{{#sub}}<li><a href="#" onclick="getSubClause({{Id}})">Clause #{{Id}}.{{ClauseId}}</a></li>{{/sub}}</ul>';
        var compiled = Hogan.compile(template);
        var html     = compiled.render(view);
        // Note that the name: name part is option and just for demonstration
        res.send(html);
    });
    
    app.get('/sim/:name/chatroom/resolution', function(req, res) {
        /*todo: might send the resolution Id by httprequest
         * This is a demonstration
         * */
        
        var resolution = db.resolutions[0];
        var text = '<ul>';
        db.clauses.forEach(function(clause){
            text += '<li id="clause_'+clause.Id+'">'+clause.Content+'<p style="text-align: left"><a href="#" '+
            'onclick="getClause('+clause.Id+')">Discuss clause &raquo;</a></p>';
            var found = false;
            db.subclauses.forEach(function(sub){
                if (sub.ClauseId == clause.Id){
                    found = true;
                }
            });
            if (found){
                text += '<ul>';
                db.subclauses.forEach(function(sub){
                    text += '<li id="subclause_'+sub.Id+'">'+sub.Content+'<p style="text-align: left"><a href="#" '+
                    'onclick="getSubClause('+sub.Id+')">Discuss clause &raquo;</a></p></li>';
                });
                text += '</ul>';
            }
            text += '</li>';
        });
        text += '</ul>';
        res.render('chatroom/resolution', {title: resolution.Title, content: resolution.Content, clauses: text});
    });
    
    
    app.post('/sim/:name/chatroom/clauseAndEntries', function(req, res) {
        //clause Id
        //db.Clauses
        var clauseId = req.param('id');
        var clause;
        for (var i=0; i<db.clauses.length; i++){
            if (clauseId == db.clauses[i].Id){
                clause = db.clauses[i];
                break;
            }
        }
        var relatedEntries = [];
        db.entries.forEach(function(entry){
            if (entry.ClauseId == clauseId){
                relatedEntries.push(entry);
            }
        });
        
        
        var filePath = 'templates/comment.txt';
        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
            if (!err){
                var view     = {entrs: relatedEntries};
                var template = '{{#entrs}}'+data+'{{/entrs}}';
                var compiled = Hogan.compile(template);
                var html     = compiled.render(view);
                res.render('chatroom/entry', {id: clause.Id,  clause_content: clause.Content, typeofclause: 'main', entries: html});
            }else{
                console.log(err);
            }
        });
        
//        var view     = {entrs: relatedEntries};
//        var template = '{{#entrs}}<div id="{{Id}}"><p>By: {{Team}}</p><p>{{Content}}</p></div><br />{{/entrs}}';
//        var compiled = Hogan.compile(template);
//        var html     = compiled.render(view);
//        res.render('chatroom/entry', {id: clause.Id,  clause_content: clause.Content, typeofclause: 'main', entries: html});
    });
    
    app.post('/sim/:name/chatroom/subclauseAndEntries', function(req, res) {
        //clause Id
        //db.Clauses
        var clauseId = req.param('id');
        var clause;
        for (var i=0; i<db.subclauses.length; i++){
            if (clauseId == db.clauses[i].Id){
                clause = db.subclauses[i];
                break;
            }
        }
        var relatedEntries = [];
        db.entriesSubClause.forEach(function(entry){
            if (entry.ClauseId == clauseId){
                relatedEntries.push(entry);
            }
        });
        var filePath = 'templates/comment.txt';
        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
            if (!err){
                var view     = {entrs: relatedEntries};
                var template = '{{#entrs}}'+data+'{{/entrs}}';
                var compiled = Hogan.compile(template);
                var html     = compiled.render(view);
                res.render('chatroom/entry', {id: clause.Id,  clause_content: clause.Content, typeofclause: 'sub', entries: html});
            }else{
                console.log(err);
            }
        });
        /*var view     = {entrs: relatedEntries};
        var template = '{{#entrs}}<div id="sub_{{Id}}"><p>By: {{Team}}</p><p>{{Content}}</p></div><br />{{/entrs}}';
        var compiled = Hogan.compile(template);
        var html     = compiled.render(view);
        res.render('chatroom/entry', {id: clause.Id, clause_title: clause.Title, clause_content: clause.Content, typeofclause: 'sub', entries: html});*/
    });
    
    app.post('/sim/:name/chatroom/entry', function(req, res) {
        var content = req.param('entry');
        var typeofclause = req.param('typeofclause');
        var team = req.param('team');
        var clauseId = req.param('clauseId');
        var stand = req.param('stand');
        var id = 0;
        if (typeofclause == 'sub'){
            var entry = {};
            entry.Id = db.entriesSubClause.length;
            entry.ClauseId = clauseId;
            entry.Team = team;
            entry.Content = content;
            entry.Stand = (stand == 0) ? 'for' : 'against';
            id = db.entriesSubClause.length;
            db.entriesSubClause.push(entry);
        }
        
        if (typeofclause == 'main'){
            var entry = {};
            entry.Id = db.entries.length;
            entry.ClauseId = clauseId;
            entry.Team = team;
            entry.Content = content;
            entry.Stand = (stand == 0) ? 'for' : 'against';
            id = db.entries.length;
            db.entries.push(entry);
        }
        res.send(id.toString());
    });
};

module.exports = chat;
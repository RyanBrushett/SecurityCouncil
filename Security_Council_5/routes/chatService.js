var db = require('../tempdb');
var Hogan = require('hjs');

var chat = function(app) {
	
    app.get('/chatroom', function(req, res) {
    	res.render('chatroom', {
            title: 'Chatroom'
            	});
    	//res.writeHead
    	//res.send
    });
    
    app.get('/chatroom/speakersList', function(req, res) {
    	//all speakers
    	res.send(db.users);
    });
    
    app.get('/chatroom/resolution', function(req, res) {
    	//might send the resolution Id by httprequest
    	
    	/*
    	 * there is only one resolution in the array. this is only for demonstration
    	 */
    	var resolution = db.resolutions[0];
        //var view     = {sims: db.clauses/*, sub: db.subclauses*/};
        //var template = "<ul>{{#sims}}<li>{{Content}}</li>{{/sims}}</ul>";
        //template += "<ol>{{#sub}}<li>{{Content}}</li>{{/sub}}</ol>";
        //var compiled = Hogan.compile(template);
        //var html     = compiled.render(view);
    	var text = '<ul>';
    	db.clauses.forEach(function(clause){
    		text += '<li>'+clause.Content;
    		var found = false;
    		db.subclauses.forEach(function(sub){
    			if (sub.ClauseId == clause.Id){
    				found = true;
    			}
    		});
    		if (found){
    			text += '<ul>';
    			db.subclauses.forEach(function(sub){
    				text += '<li>'+sub.Content+'</li>';
        		});
    			text += '</ul>';
    		}
    		text += '</li>';
    	});
    	text += '</ul>';
        res.render('chatroom/resolution', {title: resolution.Title, content: resolution.Content, clauses: text});
    	//resolution and clauses
    	/*
    	 * whip out content in div.content_container, push resolution
    	 */
    });
    
    app.get('/chatroom/resolutionTitle', function(req, res) {
    	//resolution and clauses
    	/*
    	 * whip out content in div.content_container, push resolution
    	 */
    });
    
    app.get('/chatroom/clauseAndEntries', function(req, res) {
    	//clause Id
    	//whip out content in div.content_container
    });
    
    app.post('/chatroom/entry', function(req, res) {
    	//clause Id and entry
    });
};

module.exports = chat;
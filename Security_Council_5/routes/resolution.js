//testing database configuration
var config = require('../config');
if (config.useDatabase === true){
	console.log('use db.js');
	var database = require('../db.js');
	database.user.getall();
	database.user.insert("data");
}
else{
	console.log('use tempdb.js');
}


var rooms   = require('../tempdb').rooms;
var users   = require('../tempdb').users;
var members = require('../tempdb').members;
var resolutions = require('../tempdb').resolutions;
var clauses = require('../tempdb').clauses;
var subclauses = require('../tempdb').subclauses;

exports.createResolution = function(req, res){
    var idx = resolutions.length;
    resolutions.push({Id: idx, Content: req.param('resolutioncontent'), Title: req.param('resolutiontitle'), roomId: req.param('roomlist')});
    res.render('admin/manageresolutions', {
        title: 'Resolution Management',
        resolutionlist: resolutions,
        roomlist: rooms
    });
};

exports.getresolutioninfo = function(req, res){
    var id = req.param('resolutionId');

    var resContent;
    var resTitle;
    for(var i = 0; i < resolutions.length; i++){
        if(resolutions[i].Id == id){
            resTitle = resolutions[i].Title;
            resContent = resolutions[i].Content;
        }
    }

    res.render('admin/resolutioninfo', {
        resId: id,
        title: resTitle,
        content: resContent
    });
};

exports.updateresolution = function(req, res){
    var resId = req.param('id');
    var resTitle = req.param('restitle');
    var resContent = req.param('rescontent');

    for(var i = 0; i < resolutions.length; i++){
        if(resolutions[i].Id == resId){
            resolutions[i].Content = resContent;
            resolutions[i].Title = resTitle;
            break;
        }
    }
    res.render('admin/manageresolutions', {
        title: 'Resolution Management',
        resolutionlist: resolutions,
        roomlist: rooms
    });
};


exports.editResolution = function(req, res){
	var id = req.param('id');
	    console.log(id);
	    var resContent;
	    var resTitle;
	    for(var i = 0; i < resolutions.length; i++){
	        if(resolutions[i].Id == id){
	            resTitle = resolutions[i].Title;
	            resContent = resolutions[i].Content;
	        }
	    }

	    res.render('admin/editResolution', {
	    	title: 'Edit resolution',
	        resId: id,
	        resTitle: resTitle,
	        content: resContent
	    });
	};

//create a clause
exports.createClause = function(req, res){
    var idx = clauses.length+1;
    clauses.push({Id: idx, Content: req.param('clausecontent'), resolutionId: req.param('resId')});
    var rec = {
    	Id: idx, Content: req.param('clausecontent'), ResId: req.param('resId')
    };
    res.send(rec);
};

//create a sub clause
exports.createSubclause = function(req, res){
    var idx = subclauses.length+1;
    subclauses.push({Id: idx, Content: req.param('clausecontent'), ClauseId: req.param('clauseId')});
    var rec = {
    	Id: idx, Content: req.param('clausecontent'), ClauseId: req.param('clauseId')
    };
    res.send(rec);
};

//remove clause
//todo: needs to be refactored
exports.removeClause = function(req, res){
	var type = req.param('type');
	if (type === 'sub'){
		for(var j = 0; j < subclauses.length; j++){
	        if(subclauses[j].Id == req.param('id')){
	        	subclauses.splice(j, 1);
	        	break;
	        };
		};
		res.send('success');
	}
	if (type === 'main'){
		for(var i = 0; i < clauses.length; i++){
	        if(clauses[i].Id == req.param('id')){
	        	for(var j = 0; j < subclauses.length; j++){
	    	        if(subclauses[j].ClauseId == clauses[i].Id){
	    	        	subclauses.splice(j, 1);
	    	        };
	    		};
	    		clauses.splice(i, 1);
	        	break;
	        };
		};
		res.send('success');
	}
};

//get a specific clause
exports.getClause = function(req, res){
	var type = req.param('type');
	var single = req.param('amount');
	if(single !== '' && single !== null && single == 'single'){
		if (type !== '' && type !== null && type == 'main'){
			var clauseId = req.param('id');
			for(var j = 0; j < clauses.length; j++){
		        if(clauses[j].Id == clauseId){
		        	res.send(clauses[j]);
		        	break;
		        };
			};
		}
		else if (type !== '' && type !== null && type == 'sub'){
			var clauseId = req.param('id');
			for(var j = 0; j < subclauses.length; j++){
	        if(subclauses[j].Id == clauseId){
	        	res.send(subclauses[j]);
	        	break;
	        }
			}
		}

		return;
	}
	var clauseId = req.param('id');
	var sub = [];
	for(var j = 0; j < subclauses.length; j++){
        if(subclauses[j].ClauseId == clauseId){
            sub.push(subclauses[j]);
        }
	}
    res.send(sub);
};

//update a specific clause
exports.updateClause = function(req, res){
	var type = req.param('type');
    if (type === 'main'){
    	for(var i = 0; i < clauses.length; i++){
            if(clauses[i].Id == req.param('clauseId')){
                clauses[i].Content = req.param('clausecontent');
                break;
            }
        }
    	var rec = {
    	    	Id: req.param('clauseId'), Content: req.param('clausecontent')
    	    };
    	res.send(rec);
    }
    if (type === 'sub'){
    	for(var j = 0; j < subclauses.length; j++){
            if(subclauses[j].Id == req.param('clauseId')){
                subclauses[j].Content = req.param('clausecontent');
                break;
            }
    	}
    	var rec = {
    	    	Id: req.param('clauseId'), Content: req.param('clausecontent')
    	    };
    	res.send(rec);
    }
};

//retrieve all clauses
exports.editClauses = function(req, res){
	var resId = req.param('id');
	var resTitle = '';
	var main = [];
	//get resolution info
	for(var i = 0; i < resolutions.length; i++){
        if(resolutions[i].Id == resId){
        	resTitle = resolutions[i].Title;
            break;
        }
    }
	//get clauses and subclauses under resolution
	for(var i = 0; i < clauses.length; i++){
        if(clauses[i].resolutionId == resId){
            main.push(clauses[i]);
        }
    }
	//render template
	res.render('admin/editClauses', {
        title: 'Resolution clauses',
        resolutionTitle: resTitle,
        clauseList: main,
        resolutionId: resId
    });
};

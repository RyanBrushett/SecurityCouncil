var config = require('../config');
//testing database configuration
if (config.useDatabase === true){
	console.log('use db.js');
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

exports.createresolution = function(req, res){
    var idx = resolutions.length;
    resolutions.push({Id: idx, Content: req.param('resolutioncontent'), Title: req.param('resolutiontitle'), roomId: 0});
    
    res.render('admin/manageresolutions', {
        title: 'Resolution Management',
        resolutionlist: resolutions
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
    
    console.log(resId);
    console.log(resContent);
    
    res.render('admin/manageresolutions', {
        title: 'Resolution Management',
        resolutionlist: resolutions
    });
};


exports.editClauses = function(req, res){
	var resId = req.param('id');
	var resTitle = '';
	var sub = [];
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
            for(var j = 0; j < subclauses.length; j++){
                if(subclauses[j].ClauseId == clauses[i].Id){
                	console.log('check');
                    sub.push(subclauses[j]);
                }
            }
        }
    }
	//render template
	res.render('admin/editClauses', {
        title: 'Resolution clauses',
        resolutionTitle: resTitle,
        subClauseList: sub,
        clauseList: main
    });
};
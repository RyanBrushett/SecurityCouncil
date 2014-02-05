var rooms   = require('../tempdb').rooms;
var users   = require('../tempdb').users;
var members = require('../tempdb').members;
var resolutions = require('../tempdb').resolutions;

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

exports.updateresolution = function(req, res){
    
};
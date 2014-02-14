var rooms   = require('../tempdb').rooms;
var users   = require('../tempdb').users;
var members = require('../tempdb').members;
var resolutions = require('../tempdb').resolutions;

exports.createResolution = function(req, res){
    var idx = resolutions.length;
    resolutions.push({Id: idx, Content: req.param('resolutioncontent'), Title: req.param('resolutiontitle'), roomId: 0});
    
    res.render('admin/manageresolutions', {
        title: 'Resolution Management',
        resolutionlist: resolutions
    });
};

exports.getResolutionInfo = function(req, res){
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

exports.updateResolution = function(req, res){
    var resId = req.param('id');
    var resContent = req.param('rescontent');
    
    for(var i = 0; i < resolutions.length; i++){
        if(resolutions[i].Id == resId){
            resolutions[i].Content = resContent;
        }
    }
    
    console.log(resId);
    console.log(resContent);
    
    res.render('admin/manageresolutions', {
        title: 'Resolution Management',
        resolutionlist: resolutions
    });
};
exports.getscadmin = function(req,res){
    res.render('sc-admin', {title: 'Admin Page'});
};

exports.postscadmin = function(req,res){
    res.send('Nothing right now');
};

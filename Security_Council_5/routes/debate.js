var db = require('../db');
var Motions = require('../models/motion.js');

exports.view = function(req, res) {
    var simulation = db.simulations[req.params.id];
    var currentUser = db.users[req.session.userId];
    currentUser.flag = undefined;
    simulation.currentUser = currentUser;
    
    //Check if there is a motion up for debate
    var motions = simulation.getMotions();
    for(var i = 0; i < motions.length; i++){
        if(motions[i].getStatus() === Motions.Status.VOTE){          
            if(db.helpers.isUserAmbassador(simulation, currentUser)){
                simulation.motionToVote = motions[i];
                simulation.userCanVote = true;
            }
            else{
                simulation.userCanVote = false;
            }
        }
    }
    
    res.render('debate/index', simulation);
};

exports.comment = function(req, res) {
    var simulation = db.simulations[req.params.id];
    var currentUser = db.users[req.session.userId];
    
    var countries = simulation.getCountries();
    for(var i = 0; i < countries.length; i++){
        var members = countries[i].getMembers();
        for(var j = 0; j < members.length; j++){
            if(currentUser.getId() === members[j].getId()){
                //currentUser.flag = countries[i].flag();
                currentUser.setFlag(countries[i].flag());
                console.log(currentUser.getFlag());
            }
            else{
                currentUser.flag = undefined;
            }
        }
    }
    
    simulation.currentUser = currentUser;
    
    var newComment = db.helpers.createComment(simulation, {
        content: req.body.comment,
        user: currentUser
    });
    simulation.addComment(newComment);
    
    res.render('debate/index', simulation);
};
var db = require('../db');
var Motion = require('../models/motion.js');

exports.view = function(req, res) {
    var simulation = db.simulations[req.params.id];
    var currentUser = db.users[req.session.userId];
    currentUser.flag = undefined;
    simulation.currentUser = currentUser;
    simulation.sid = req.params.id;
    
    simulation = checkVotingPermissions(simulation, currentUser);
    
    res.render('debate/index', simulation);
};

exports.comment = function(req, res) {
    var simulation = db.simulations[req.params.id];
    var currentUser = db.users[req.session.userId];
    simulation.sid = req.params.id;
    
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
    
    simulation = checkVotingPermissions(simulation, currentUser);  
    
    res.render('debate/index', simulation);
};

exports.vote = function(req, res) {
    var simulation = db.simulations[req.params.sid];
    var currentUser = db.users[req.session.userId];
    
    simulation.currentUser = currentUser;
    simulation.sid = req.params.sid;
    
    var motions = simulation.getMotions();
    var currentVotes = motions[req.params.mid].getVotes();
    
    var numericVote = 0;
    if(req.body.vote == "yay") numericVote = 1;
    if(req.body.vote == "nay") numericVote = 2;
    if(req.body.vote == "absent") numericVote = 3;
    
    var newVote = {
        vote: numericVote,
        user: currentUser
    };
    
    currentVotes.push(newVote);
    motions[req.params.mid].setVotes(currentVotes);
    
    //Determine if vote is finished, maybe should be in a separate method
    if(currentVotes.length === simulation.getCountries().length){
        var votesFor = 0;
        var votesAgainst = 0;
        var numAbsent = 0;
        for(var i = 0; i < currentVotes.length; i++){
            if(currentVotes[i].vote === 1){
                votesFor++;
            }
            else if(currentVotes[i].vote === 2){
                votesAgainst++;
            }
            else{
                numAbsent++;
            }
        }
        
        console.log(votesFor);
        console.log(votesAgainst);
        console.log(numAbsent);
        
        var quorum = Math.round(simulation.getCountries().length * (2.0 / 3.0));
        console.log(quorum);
        if((currentVotes.length - numAbsent) >= quorum){       
            var requiredVotes = Math.floor(simulation.getCountries().length / 2) + 1;
            
            if(votesFor >= requiredVotes){
                //Vote passes
                console.log('pass');
                
                motions[req.params.mid].setStatus(Motion.Status.APPROVED);
                
                var commentContent = "Vote on motion passed! <br />";
                commentContent += "Now debating the resolution.";
                
                var newComment = db.helpers.createComment(simulation, {
                    content: commentContent,
                    user: simulation.getChairperson()
                });
                simulation.addComment(newComment);
                
                simulation.getResolution().setInDebate(true);
            }
            else{
                //Vote fails
                console.log('fail');
                
                motions[req.params.mid].setStatus(Motion.Status.DENIED);
                
                var commentContent = "Vote on motion failed! <br />";
                commentContent += "Now debating the resolution.";
                
                var newComment = db.helpers.createComment(simulation, {
                    content: commentContent,
                    user: simulation.getChairperson()
                });
                simulation.addComment(newComment);                
                
                simulation.getResolution().setInDebate(true);
            }
        }
        else{
            console.log('quorum not met');
            
            motions[req.params.mid].setStatus(Motion.Status.DEBATE);
            motions[req.params.mid].setVotes([]);
            
            var commentContent = "Quorum not met! <br />";
            commentContent += "Continuing debate on the motion.<br /> <br />";
            commentContent += simulation.getMotions()[req.params.mid].getBody() + "<br />";
            commentContent += "Moved by: " + simulation.getMotions()[req.params.mid].getMover().getName() + "<br />";            
            
            var newComment = db.helpers.createComment(simulation, {
                content: commentContent,
                user: simulation.getChairperson()
            });
            simulation.addComment(newComment);            
        }
    }
    
    simulation = checkVotingPermissions(simulation, currentUser);
    
    res.render('debate/index', simulation);
};

exports.voteResolution = function(req, res) {
    var simulation = db.simulations[req.params.sid];
    var currentUser = db.users[req.session.userId];
    
    simulation.currentUser = currentUser;
    simulation.sid = req.params.sid;

    var currentVotes = simulation.getResolution().getVotes();
    
    var numericVote = 0;
    if(req.body.vote == "yay") numericVote = 1;
    if(req.body.vote == "nay") numericVote = 2;
    if(req.body.vote == "absent") numericVote = 3;
    
    var newVote = {
        vote: numericVote,
        user: currentUser
    };
    
    currentVotes.push(newVote);
    simulation.getResolution().setVotes(currentVotes);
    
    //Determine if vote is finished, maybe should be in a separate method
    if(currentVotes.length === simulation.getCountries().length){
        var votesFor = 0;
        var votesAgainst = 0;
        var numAbsent = 0;
        for(var i = 0; i < currentVotes.length; i++){
            if(currentVotes[i].vote === 1){
                votesFor++;
            }
            else if(currentVotes[i].vote === 2){
                votesAgainst++;
            }
            else{
                numAbsent++;
            }
        }
        
        console.log(votesFor);
        console.log(votesAgainst);
        console.log(numAbsent);
        
        var quorum = Math.round(simulation.getCountries().length * (2.0 / 3.0));
        console.log(quorum);
        if((currentVotes.length - numAbsent) >= quorum){       
            var requiredVotes = Math.floor(simulation.getCountries().length / 2) + 1;
            
            if(votesFor >= requiredVotes){
                //Vote passes
                console.log('pass');
                
                simulation.getResolution().setStatus(1);
                
                var commentContent = "Vote on resolution passed! <br />";
                
                var newComment = db.helpers.createComment(simulation, {
                    content: commentContent,
                    user: simulation.getChairperson()
                });
                simulation.addComment(newComment);
                
                simulation.getResolution().setInDebate(false);
            }
            else{
                //Vote fails
                console.log('fail');
                
                simulation.getResolution().setStatus(2);
                
                var commentContent = "Vote on resolution failed! <br />";
                commentContent += "Now debating the resolution.";
                
                var newComment = db.helpers.createComment(simulation, {
                    content: commentContent,
                    user: simulation.getChairperson()
                });
                simulation.addComment(newComment);                
                
                simulation.getResolution().setInDebate(true);
            }
        }
        else{
            console.log('quorum not met');
            
            simulation.getResolution().setInDebate(true);
            simulation.getResolution().setVotes([]);
            
            var commentContent = "Quorum not met! <br />";
            commentContent += "Continuing debate on the resolution.<br /> <br />";         
            
            var newComment = db.helpers.createComment(simulation, {
                content: commentContent,
                user: simulation.getChairperson()
            });
            simulation.addComment(newComment);            
        }
    }
    
    simulation = checkVotingPermissions(simulation, currentUser);
    
    res.render('debate/index', simulation);    
};

//Checks voting permissions for a given user
function checkVotingPermissions(simulation, user) {
    var s = simulation;
    s.voting = false;
    s.votingMotion = false;
    s.votingResolution = false;
    
    var motions = s.getMotions();
    for(var i = 0; i < motions.length; i++){
        if(motions[i].getStatus() === Motion.Status.VOTE){
            s.voting = true;
            s.votingMotion = true;
            s.motionToVote = motions[i];
            
            if(!db.helpers.hasUserVoted(motions[i], user)){
                s.hasNotVoted = true;
                
                if(db.helpers.isUserAmbassador(s, user)){
                    s.userCanVote = true;
                }
                else{
                    s.userCanVote = false;
                }
            }
            else{
                s.hasNotVoted = false;
                s.userCanVote = false;
            }
        }
    }
    
    if((s.votingMotion === false) && s.getResolution().isInVote()){
        s.voting = true;
        s.votingResolution = true;
        
        if(!db.helpers.hasUserVotedResolution(s.getResolution(), user)){
            s.hasNotVoted = true;
            
            if(db.helpers.isUserAmbassador(s, user)){
                s.userCanVote = true;
            }
            else{
                s.userCanVote = false;
            }
        }
        else{
            s.hasNotVoted = false;
            s.userCanVote = false;
        }        
    }
    
    return s;
}
var db = require('../db');
var Motion = require('../models/motion.js');

exports.view = function(req, res) {
    var simulation = db.simulations[req.params.id];
    var currentUser = db.users[req.session.userId];
    var userCountry = db.helpers.getUserCountry(simulation, currentUser);
    var debateResolution = simulation.resolution.inDebate;
    var voteResolution = simulation.resolution.inVote;
    var isModerator = false;
    var users = db.users;
    var countries = db.countries;
    
    //db.helpers.setUserFlag(simulation, currentUser);
    
    if (currentUser.moderator) {
        isModerator = true;
    }
    
    var perm = db.helpers.checkVotingPermissions(simulation, currentUser);
    var chPerm = db.helpers.checkPostingPermissions(simulation.communicationChannels[0], currentUser);
    
    res.render('debate/index', {
        simulation: simulation,
        currentUser: currentUser,
        permissions: perm,
        channel: simulation.communicationChannels[0],
        userCanComment: chPerm.userCanComment,
        userCanRead: chPerm.userCanRead,
        userCountry: userCountry,
        debateReso: debateResolution,
        voteReso: voteResolution,
        isModerator: isModerator,
        users: users,
        visibleChannels: db.helpers.getVisibleChannels(simulation, currentUser),
        defaultChannelId: simulation.communicationChannels[0].id
    });
};

exports.viewChannel = function (req, res) {
    var simulation = db.simulations[req.params.id];
    var commChannel = db.helpers.getCommunicationChannelById(simulation, req.params.chid);
    var currentUser = db.users[req.session.userId];
    var userCountry = db.helpers.getUserCountry(simulation, currentUser);
    var debateResolution = simulation.resolution.inDebate;
    var voteResolution = simulation.resolution.inVote;
    var isModerator = false;
    var users = db.users;
    var countries = db.countries;
    
    // db.helpers.setUserFlag(simulation, currentUser);
    
    if (currentUser.moderator) {
        isModerator = true;
    }
    
    var perm = db.helpers.checkVotingPermissions(simulation, currentUser);
    var chPerm = db.helpers.checkPostingPermissions(commChannel, currentUser);
    
    res.render('debate/index', {
        simulation: simulation,
        currentUser: currentUser,
        permissions: perm,
        channel: commChannel,
        userCanComment: chPerm.userCanComment,
        userCanRead: chPerm.userCanRead,
        userCountry: userCountry,
        debateReso: debateResolution,
        voteReso: voteResolution,
        isModerator: isModerator,
        users: users,
        visibleChannels: db.helpers.getVisibleChannels(simulation, currentUser),
        defaultChannelId: simulation.communicationChannels[0].id
    });    
};

exports.createChannel = function (req, res) {
    var simulation = db.simulations[req.params.sid];
    var commChannel = db.helpers.getCommunicationChannelById(simulation, req.params.chid);
    var currentUser = db.users[req.session.userId];
    // db.helpers.setUserFlag(simulation, currentUser);
    
    var perm = db.helpers.checkVotingPermissions(simulation, currentUser);
    var chPerm = db.helpers.checkPostingPermissions(commChannel, currentUser);
    
    var channelName = req.body.channelname;
    if (channelName == "") {
        channelName = "Untitled";
    }
    
    var channel = db.helpers.createCommunicationChannel(simulation, {
        label: channelName,
        permissions: true
    });
    
    db.helpers.addUserToChannel(channel, currentUser);
    
    for (var i = 0; i < db.users.length; i++) {
        if (db.users[i].moderator === true) {
            db.helpers.addUserToChannel(channel, db.users[i]);
        }
    }    
    
    if (req.body.usercheck !== undefined) {
        for (var i = 0; i < req.body.usercheck.length; i++) {
            db.helpers.addUserToChannel(channel, db.users[req.body.usercheck[i]]);
        }
    }

    if (Array.isArray(req.body.countrycheck)) {
        if (req.body.countrycheck !== undefined) {
            for (var i = 0; i < req.body.countrycheck.length; i++) {
                for (var j = 0; j < simulation.countries.length; j++) {
                    if (simulation.countries[j].id == req.body.countrycheck[i]) {
                        for (var k = 0; k < simulation.countries[j].members.length; k++) {
                            if (simulation.countries[j].members[k] != currentUser) {
                                db.helpers.addUserToChannel(channel, simulation.countries[j].members[k]);
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        for (var i = 0; i < simulation.countries.length; i++) {
            if (simulation.countries[i].id == req.body.countrycheck) {
                for (var j = 0; j < simulation.countries[i].members.length; j++) {
                    db.helpers.addUserToChannel(channel, simulation.countries[i].members[j]);
                }
            }
        }       
    }
    
    res.redirect('/debate/' + req.params.sid + '/' + req.params.chid);
};

exports.comment = function(req, res) {
    var simulation = db.simulations[req.params.id];
    var commChannel = db.helpers.getCommunicationChannelById(simulation, req.params.chid);
    var currentUser = db.users[req.session.userId];
    // db.helpers.setUserFlag(simulation, currentUser);
    var comment = db.helpers.createComment(commChannel, {
        content: req.body.comment,
        user: currentUser
    });
    
    db.helpers.setCommentFlag(simulation, comment, currentUser);

    res.redirect('/debate/' + req.params.id + '/' + req.params.chid);
};

exports.vote = function(req, res) {
    var simulation = db.simulations[req.params.sid];
    var currentUser = db.users[req.session.userId];
    var motion = simulation.motions[req.params.mid];
    var commChannel = simulation.communicationChannels[0];
    var currentVotes = motion.votes;
    var numericVote = 0;

    if (req.body.vote == 'yay') {
        numericVote = 1;
    }
    if (req.body.vote == 'nay') {
        numericVote = 2;
    }
    if(req.body.vote == 'absent') {
        numericVote = 3;
    }
    db.helpers.createVote(motion, {
        vote: numericVote,
        user: currentUser
    });
    // Determine if vote is finished, maybe should be in a separate method
    if (currentVotes.length === simulation.countries.length) {
        var votesFor = 0;
        var votesAgainst = 0;
        var numAbsent = 0;
        for (var i = 0; i < currentVotes.length; i++) {
            if (currentVotes[i].vote === 1) {
                votesFor++;
            }
            else if (currentVotes[i].vote === 2) {
                votesAgainst++;
            }
            else {
                numAbsent++;
            }
        }
        var quorum = Math.round(simulation.countries.length * (2.0 / 3.0));
        if ((currentVotes.length - numAbsent) >= quorum) {
            var requiredVotes = Math.floor(simulation.countries.length / 2) + 1;
            if (votesFor >= requiredVotes) {
                motion.isApproved = true;
                motion.inDebate = false;
                motion.inVote = false;
                
                var comment = db.helpers.createComment(simulation.communicationChannels[0], {
                    content: 'Vote on motion passed!\nNow debating the resolution.',
                    user: simulation.chairperson
                });
                db.helpers.setCommentFlag(simulation, comment, simulation.chairperson);
                
                simulation.resolution.inDebate = true;
            }
            else {
                motion.isDenied = true;
                motion.inVote = false;
                motion.inDebate = false;
                
                var commentContent = 'Vote on motion failed!\n';
                commentContent += 'Now debating the resolution.';
                var comment = db.helpers.createComment(simulation.communicationChannels[0], {
                    content: commentContent,
                    user: simulation.chairperson
                });
                db.helpers.setCommentFlag(simulation, comment, simulation.chairperson);
                simulation.resolution.inDebate = true;
            }
        }
        else {
            motion.inDebate = true;
            motion.inVote = false;
            
            motion.votes = [];
            var commentContent = 'Quorum not met!\n';
            commentContent += 'Continuing debate on the motion.\n';
            commentContent += motion.body + '\n';
            commentContent += 'Moved by: ' + motion.mover.name + '\n';
            var comment = db.helpers.createComment(simulation.communicationChannels[0], {
                content: commentContent,
                user: simulation.chairperson
            });
            db.helpers.setCommentFlag(simulation, comment, simulation.chairperson);
        }
    }
    
    res.redirect('/debate/' + req.params.sid);
};

exports.voteResolution = function(req, res) {
    var simulation = db.simulations[req.params.sid];
    var currentUser = db.users[req.session.userId];
    var commChannel = simulation.communicationChannels[0];

    var currentVotes = simulation.resolution.votes;
    var numericVote = 0;
    if (req.body.vote == "yay") {
        numericVote = 1;
    }
    if (req.body.vote == "nay") {
        numericVote = 2;
    }
    if (req.body.vote == "absent") {
        numericVote = 3;
    }
    var veto = false;
    if (db.helpers.isUserCountryPermanent(simulation, currentUser)) {
        if (numericVote == 2) {
            veto = true;
            simulation.resolution.isDenied = true;
            var country = db.helpers.getUserCountry(simulation, currentUser).name;
            var commentContent = 'Vote on resolution failed due to veto by ' + country + '!\n';
            var comment = db.helpers.createComment(simulation.communicationChannels[0], {
                content: commentContent,
                user: simulation.chairperson
            });
            db.helpers.setCommentFlag(simulation, comment, simulation.chairperson);
            simulation.resolution.inDebate = false;
            simulation.resolution.inVote = false;
        }
    }
    if (!veto) {
        db.helpers.createVote(simulation.resolution, {
            vote: numericVote,
            user: currentUser
        });
        // Determine if vote is finished, maybe should be in a separate method
        if (currentVotes.length === simulation.countries.length) {
            var votesFor = 0;
            var votesAgainst = 0;
            var numAbsent = 0;
            for (var i = 0; i < currentVotes.length; i++) {
                if (currentVotes[i].vote === 1) {
                    votesFor++;
                }
                else if (currentVotes[i].vote === 2) {
                    votesAgainst++;
                }
                else {
                    numAbsent++;
                }
            }
            var quorum = Math.round(simulation.countries.length * (2.0 / 3.0));
            if ((currentVotes.length - numAbsent) >= quorum) {
                var requiredVotes = Math.floor(simulation.countries.length / 2) + 1;
                if (votesFor >= requiredVotes) {
                    simulation.resolution.isApproved = true;
                    var comment = db.helpers.createComment(simulation.communicationChannels[0], {
                        content: 'Vote on resolution passed!\n',
                        user: simulation.chairperson
                    });
                    db.helpers.setCommentFlag(simulation, comment, simulation.chairperson);
                    simulation.resolution.inDebate = false;
                    simulation.resolution.isApproved = true;
                }
                else {
                    simulation.resolution.isDenied = true;
                    var comment = db.helpers.createComment(simulation.communicationChannels[0], {
                        content: 'Vote on resolution failed!\n',
                        user: simulation.chairperson
                    });
                    db.helpers.setCommentFlag(simulation, comment, simulation.chairperson);
                    simulation.resolution.inDebate = false;
                }
            }
            else {
                simulation.resolution.voteStatus = 0;
                simulation.resolution.inDebate = true;
                simulation.resolution.votes = [];
                simulation.resolution.inVote = false;
                var comment = db.helpers.createComment(simulation.communicationChannels[0], {
                    content: 'Quorum not met!\nContinuing debate on the resolution.\n',
                    user: simulation.chairperson
                });
                db.helpers.setCommentFlag(simulation, comment, simulation.chairperson);
            }
        }
    }
    
    res.redirect('/debate/' + req.params.sid);
};

exports.deleteChannel = function (req, res) {
    var simulation = db.simulations[req.body.sid];
    var user = db.users[req.body.uid];
    var channels = simulation.communicationChannels;
    var channel;
    channels.forEach(function(ch){
        if (ch.id === req.body.chid){
            channel = ch;
        }
    });
    if (user !== undefined && simulation !== undefined && channel !== undefined) {
        var length = db.helpers.deleteCommunicationChannel(channel);
        res.send(200);
    } else {
        res.send(404);
    }
};

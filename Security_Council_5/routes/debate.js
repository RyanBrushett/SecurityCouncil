var db = require('../db');
var Motion = require('../models/motion.js');

exports.view = function(req, res) {
    var simulation = db.simulations[req.params.id];
    var currentUser = db.users[req.session.userId];
    currentUser.flag = undefined;
    checkVotingPermissions(simulation, currentUser);
    res.render('debate/index', {
        simulation: simulation,
        currentUser: currentUser
    });
};

exports.comment = function(req, res) {
    var simulation = db.simulations[req.params.id];
    var currentUser = db.users[req.session.userId];
    simulation.sid = req.params.id;
    var countries = simulation.countries;
    for (var i = 0; i < countries.length; i++) {
        var members = countries[i].members;
        for (var j = 0; j < members.length; j++) {
            if (currentUser.id === members[j].id) {
                currentUser.setFlag(countries[i].flag);
            }
            else {
                currentUser.flag = undefined;
            }
        }
    }
    simulation.currentUser = currentUser;
    db.helpers.createComment(simulation, {
        content: req.body.comment,
        user: currentUser
    });
    checkVotingPermissions(simulation, currentUser);
    res.render('debate/index', simulation);
};

exports.vote = function(req, res) {
    var simulation = db.simulations[req.params.sid];
    var currentUser = db.users[req.session.userId];
    var motion = simulation.motions[req.params.mid];
    var currentVotes = motion.votes;
    var numericVote = 0;
    currentUser.flag = 'united-nations.svg';
    simulation.currentUser = currentUser;
    simulation.sid = req.params.sid;
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
                motion.status = Motion.Status.APPROVED;
                db.helpers.createComment(simulation, {
                    content: 'Vote on motion passed!\nNow debating the resolution.',
                    user: simulation.chairperson
                });
                simulation.resolution.inDebate = true;
            }
            else {
                motion.status = Motion.Status.DENIED;
                var commentContent = 'Vote on motion failed!\n';
                commentContent += 'Now debating the resolution.';
                db.helpers.createComment(simulation, {
                    content: commentContent,
                    user: simulation.chairperson
                });
                simulation.resolution.inDebate = true;
            }
        }
        else {
            motion.status = Motion.Status.DEBATE;
            motion.votes = [];
            var commentContent = 'Quorum not met!\n';
            commentContent += 'Continuing debate on the motion.\n';
            commentContent += motion.body + '\n';
            commentContent += 'Moved by: ' + motion.mover.name + '\n';
            db.helpers.createComment(simulation, {
                content: commentContent,
                user: simulation.chairperson
            });
        }
    }
    checkVotingPermissions(simulation, currentUser);
    res.render('debate/index', simulation);
};

exports.voteResolution = function(req, res) {
    var simulation = db.simulations[req.params.sid];
    var currentUser = db.users[req.session.userId];
    currentUser.flag = 'united-nations.svg';
    simulation.currentUser = currentUser;
    simulation.sid = req.params.sid;
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
            simulation.resolution.status = 2;
            var country = db.helpers.getUserCountry(simulation, currentUser).name
            var commentContent = 'Vote on resolution failed due to veto by ' + country + '!\n';
            db.helpers.createComment(simulation, {
                content: commentContent,
                user: simulation.chairperson
            });
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
                    simulation.resolution.status = 1;
                    db.helpers.createComment(simulation, {
                        content: 'Vote on resolution passed!\n',
                        user: simulation.chairperson
                    });
                    simulation.resolution.inDebate = false;
                }
                else {
                    simulation.resolution.status = 2;
                    db.helpers.createComment(simulation, {
                        content: 'Vote on resolution failed!\n',
                        user: simulation.chairperson
                    });
                    simulation.resolution.setInDebate(false);
                }
            }
            else {
                simulation.resolution.voteStatus = 0;
                simulation.resolution.inDebate = true;
                simulation.resolution.votes = [];
                simulation.resolution.inVote = false;
                db.helpers.createComment(simulation, {
                    content: 'Quorum not met!\nContinuing debate on the resolution.\n',
                    user: simulation.chairperson
                });
            }
        }
    }
    checkVotingPermissions(simulation, currentUser);
    res.render('debate/index', simulation);
};

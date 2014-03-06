var Motion = function(options) {
    this._id = options.id;
    this._type = options.type || Motion.Types.TO_ACT;
    this._mover = options.mover;
    this._seconder = options.seconder;
    this._status = options.status || Motion.Status.DEBATING;
    this._votes = options.votes;
    this._body = options.body || '';
};

// Types

Motion.prototype.Types = {
    TO_AMMEND:1,
    TO_VOTE:2,
    TO_ACT:3
};

// Statuses

Motion.prototype.Status = {
    APPROVED:1,
    DENIED:2,
    DEBATING:3,
    VOTING:4,
    CLOSED:5
};

// Getters

Motion.prototype.getId = function() {
    return this._id;
};

Motion.prototype.getType = function() {
    return this._type;
};

Motion.prototype.getMover = function() {
    return this._mover;
};

Motion.prototype.getSeconder = function() {
    return this._seconder;
};

Motion.prototype.getStatus = function() {
    return this._status;
};

Motion.prototype.getVotes = function() {
    return this._votes;
};

Motion.prototype.getBody = function() {
    return this._body;
};

Motion.prototype.isInVote = function() {
    if (this.getStatus() === 3){
        return true;
    } else {
        return false;
    }
};

// Setters

Motion.prototype.setType = function(type) {
    this._type = Motion.Types[type];
};

Motion.prototype.setMover = function(mover) {
    this._mover = mover;
};

Motion.prototype.setSeconder = function(seconder) {
    this._seconder = seconder;
};

Motion.prototype.setStatus = function(status) {
    this._status = Motion.Status[status];
};

Motion.prototype.setVotes = function(votes) {
    this._votes = votes;
};

Motion.prototype.setBody = function(body) {
    this._body = body;
};

module.exports = Motion;

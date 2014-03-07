var Motion = function(options) {
    this._id = options.id;
    this._type = options.type;
    this._mover = options.mover;
    this._seconder = options.seconder;
    this._status = options.status || Motion.Status.TABLE;
    this._votes = options.votes;
    this._body = options.body || '';
};

// Statuses

Motion.Status = {
    TABLE:1,
    DEBATE:2,
    VOTE:3,
    APPROVED:4,
    DENIED:5,
    CLOSED:6
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

Motion.prototype.isInDebate = function() {
    if(this.getStatus() === 2){
        return true;
    }
    else{
        return false;
    }
}

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
    this._status = status;
};

Motion.prototype.setVotes = function(votes) {
    this._votes = votes;
};

Motion.prototype.setBody = function(body) {
    this._body = body;
};

module.exports = Motion;

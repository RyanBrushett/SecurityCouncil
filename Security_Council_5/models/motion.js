function Motion(options) {
    options = options || {};
    this.body = options.body;
    this.id = options.id;
    this.mover = options.mover;
    this.seconder = options.seconder;
    this.status = options.status || Motion.Status.TABLE;
    this.type = options.type;
    this.votes = options.votes || [];
};

Motion.Status = {
    TABLE: 1,
    DEBATE: 2,
    VOTE: 3,
    APPROVED: 4,
    DENIED: 5,
    CLOSED: 6
};

module.exports = Motion;

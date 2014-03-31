function Motion(options) {
    options = options || {};
    this.body = options.body;
    this.id = options.id;
    this.mover = options.mover;
    this.seconder = options.seconder;
    this.isDebate = false;
    this.isVote = false;
    this.isApproved = false;
    this.isDenied = false;
    this.type = options.type;
    this.votes = options.votes || [];
};

module.exports = Motion;

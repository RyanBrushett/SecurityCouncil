function Motion(options) {
    options = options || {};
    this.body = options.body;
    this.id = options.id;
    this.mover = options.mover;
    this.seconder = options.seconder || false;
    this.inDebate = options.inDebate || false;
    this.inVote = options.inVote || false;
    this.isApproved = options.isApproved || false;
    this.isDenied = options.isDenied || false;
    this.isDeleted = options.isDeleted || false;
    this.type = options.type;
    this.votes = options.votes || [];
};

module.exports = Motion;

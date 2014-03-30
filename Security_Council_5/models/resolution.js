function Resolution(options) {
    options = options || {};
    this.content = options.content;
    this.id = options.id;
    this.inDebate = true;
    this.inVote = false;
    this.isApproved = false;
    this.isDenied = false;
    this.title = options.title;
    this.votes = options.votes || [];
};

module.exports = Resolution;

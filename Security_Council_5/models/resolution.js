function Resolution(options) {
    options = options || {};
    this.content = options.content;
    this.id = options.id;
    this.inDebate = !!options.inDebate;
    this.inVote = !!options.inVote;
    this.title = options.title;
    this.votes = options.votes || [];
    this.voteStatus = 0;
};

module.exports = Resolution;

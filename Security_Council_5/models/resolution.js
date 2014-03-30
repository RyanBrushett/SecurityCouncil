function Resolution(options) {
    options = options || {};
    this.content = options.content;
    this.id = options.id;
    this.inDebate = !!options.inDebate || true;
    this.inVote = !!options.inVote || false;
    this.title = options.title;
    this.votes = options.votes || [];
    this.voteStatus = 0;
};

module.exports = Resolution;

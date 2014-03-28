function Vote(options) {
    options = options || {};
    this.vote = options.vote;
    this.user = options.user;
};

module.exports = Vote;

function Comment(options) {
    options = options || {};
    this.content = options.content;
    this.id = options.id;
    this.user = options.user;
};

module.exports = Comment;

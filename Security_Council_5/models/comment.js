function Comment(options) {
    options = options || {};
    this.content = options.content;
    this.id = options.id;
    this.user = options.user;
    this.commentFlag = options.commmentFlag;
};

module.exports = Comment;

function Comment(options) {
    options = options || {};
    this.content = options.content;
    this.id = options.id;
    this.user = options.user;
    this.flag = options.flag;
};

module.exports = Comment;

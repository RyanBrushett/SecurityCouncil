var Comment = function (options){
    this._id = options.id;
    this._content = options.content;
    this._user = options.user;
};

Comment.prototype.getId = function () {
    return this._id;
};

Comment.prototype.getContent = function () {
    return this._content;
};

Comment.prototype.getUser = function () {
    return this._user;
};

module.exports = Comment;
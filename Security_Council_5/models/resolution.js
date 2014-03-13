var Resolution = function (options) {
    this._title = options.title || 'This is a brand spanking new resolution';
    this._content = options.content || 'Lorem ipsum dolor sit amet.';
    this._inDebate = true;
    this._inVote = false;
    this._votes = options.votes || [];
};

Resolution.prototype.setTitle = function (title) {
    this._title = title;
};

Resolution.prototype.getTitle = function () {
    return this._title;
};

Resolution.prototype.setContent = function (content) {
    this._content = content;
};

Resolution.prototype.getContent = function () {
    return this._content;
};

Resolution.prototype.setInDebate = function (flag){
    this._inDebate = flag;
};

Resolution.prototype.isInDebate = function (){
    return this._inDebate;
};

Resolution.prototype.setInVote = function (flag) {
    this._inVote = flag;
};

Resolution.prototype.isInVote = function () {
    return this._inVote;
};

Resolution.prototype.getVotes = function () {
    return this._votes;
};

Resolution.prototype.setVotes = function (votes) {
    this.votes = votes;
};

module.exports = Resolution;

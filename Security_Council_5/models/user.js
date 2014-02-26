var User = function (options) {
    this._id = options.id;
    this._moderator = options.moderator || false;
    this._name = options.name;
    this._password = options.password || 'password';
    this._username = options.username;
};

User.prototype.getId = function () {
    return this._id;
};

User.prototype.isModerator = function () {
    return !!this._moderator;
};

User.prototype.setName = function (name) {
    this._name = name;
};

User.prototype.getName = function () {
    return this._name;
};

User.prototype.checkPassword = function (password) {
    return (this._password === password);
};

User.prototype.getPassword = function () {
    return this._password;
};

User.prototype.getUsername = function () {
    return this._username;
};

module.exports = User;

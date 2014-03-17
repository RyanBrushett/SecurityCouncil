var Moderator = function (options) {
    this._id = options.id;
    this._name = options.name;
    this._password = options.password || 'password';
    this._username = options.username;
};

// Getters

Moderator.prototype.getId = function () {
    return this._id;
};

Moderator.prototype.getName = function () {
    return this._name;
};

Moderator.prototype.getPassword = function () {
    return this._password;
};

Moderator.prototype.getUsername = function () {
    return this._username;
};

// Setters

Moderator.prototype.setName = function (name) {
    this._name = name;
};

Moderator.prototype.setUsername = function (username) {
    this._username = username;
};

Moderator.prototype.setPassword = function (password) {
    this._password = password;
};

// Other

Moderator.prototype.checkPassword = function (password) {
    return (this._password === password);
};

module.exports = Moderator;

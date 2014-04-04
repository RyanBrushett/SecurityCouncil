function Moderator(options) {
    options = options || {};
    this.id = options.id;
    this.moderator = true;
    this.name = options.name;
    this.password = options.password || 'password';
    this.username = options.username;
    this.flag = options.flag || 'moderator.png';
};

module.exports = Moderator;

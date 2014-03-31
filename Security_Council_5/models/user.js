function User(options) {
    options = options || {};
    this.ambassadorPreference = options.ambassadorPreference;
    this.chair = !!options.chair;
    this.id = options.id;
    this.name = options.name;
    this.password = options.password || 'password';
    this.preferences = options.preferences || [];
    this.username = options.username;
    this.numberOfComments = 0;
    this.flag = options.flag || '';
}

module.exports = User;

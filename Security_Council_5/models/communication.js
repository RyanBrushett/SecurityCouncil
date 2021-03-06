function CommunicationChannel(options) {
    options = options || {};
    this.comments = options.comments || [];
    this.id = options.id;
    this.label = options.label;
    this.participants = options.participants || [];
    this.permissions = options.permissions;
    this.isDeleted = false;
}

module.exports = CommunicationChannel;

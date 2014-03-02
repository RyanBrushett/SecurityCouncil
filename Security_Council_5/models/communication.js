var CommunicationChannel = function (options) {
    this._id = options.id;
    this._participants = options.participants || [];
    this._comments = options.comments || [];
    this._label = options.label || '';
    this._events = options.events;
    this._permissions = options.permissions;
};

// Getters

CommunicationChannel.prototype.getId = function() {
    return this._id;
};

CommunicationChannel.prototype.getParticipants = function() {
    return this._participants;
};

CommunicationChannel.prototype.getComments = function() {
    return this._comments;
};

CommunicationChannel.prototype.getLabel = function() {
    return this._label;
};

CommunicationChannel.prototype.getEvents = function() {
    return this._events;
};

CommunicationChannel.prototype.getPermissions = function() {
    return this._permissions;
};

// Setters

CommunicationChannel.prototype.setId = function(id) {
    this._id = id;
};

CommunicationChannel.prototype.setParticipants = function(participants) {
    this._participants = participants;
};

CommunicationChannel.prototype.setComments = function(comments) {
    this._comments = comments;
};

CommunicationChannel.prototype.setLabel = function(label) {
    this._label = label;
};

CommunicationChannel.prototype.setEvents = function(events) {
    this._events = events;
};

CommunicationChannel.prototype.setPermissions = function(permissions) {
    this._permissions = permissions;
};

CommunicationChannel.prototype.addParticipant = function(participant) {
    var participants = this.getParticipants();
    if (participant instanceof User) {
        participants.push(participant);
    } else if (participant instanceof Country) {
        participants.push(participant.getMembers());
    } else {
        console.log("Wrong object type for setting the participant of a comm channel");
        var toClass = {}.toString;
        console.log(toClass.call(participant));
    }
    this.setParticipants(participants);
    return participants;
};

CommunicationChannel.prototype.addComment = function(comment) {
    var comments = this.getComments();
    comments.push(comment);
    this.setComments(comments);
    return comments;
};
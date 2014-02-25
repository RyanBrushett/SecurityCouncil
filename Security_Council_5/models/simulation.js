var Simulation = function (options) {
    this._countries = options.countries || [];
    this._id = options.id;
    this._name = options.name;
    this._participants = [];
    this._resolution = options.resolution;
};

Simulation.prototype.addParticipant = function (user) {
    if (user.isModerator()) {
        throw new Error('Mods cannot be participants in a simulation');
    }
    this._participants.push(user);
};

Simulation.prototype.getResolution = function () {
    return this._resolution;
};

module.exports = Simulation;

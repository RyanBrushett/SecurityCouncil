var Simulation = function (options) {
    this._countries = options.countries || [];
    this._id = options.id;
    this._name = options.name;
    this._resolution = options.resolution;
    this._chairperson = options.chairperson;
};

Simulation.prototype.getId = function () {
    return this._id;
};

Simulation.prototype.getCountries = function () {
    return this._countries;
};

Simulation.prototype.getName = function () {
    return this._name;
};

Simulation.prototype.getNumberOfParticipants = function () {
    var count = 0;
    this._countries.forEach(function (e, i, a) {
        count += e.getMembers().length;
    });
    return count;
};

Simulation.prototype.setResolution = function (resolution) {
    this._resolution = resolution;
};

Simulation.prototype.getResolution = function () {
    return this._resolution;
};

Simulation.prototype.setChairperson = function (chairperson) {
    this._chairperson = chairperson;
};

Simulation.prototype.getChairperson = function () {
    return this._chairperson;
};

module.exports = Simulation;

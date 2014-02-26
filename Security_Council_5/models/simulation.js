var Simulation = function (options) {
    this._countries = options.countries || [];
    this._comments = options.comments || [];
    this._id = options.id;
    this._name = options.name;
    this._resolution = options.resolution;
    this._chairperson = options.chairperson;
    this._paperIsViewable = options.paperIsViewable || false;
};

Simulation.prototype.getId = function () {
    return this._id;
};

Simulation.prototype.getCountries = function () {
    return this._countries;
};

Simulation.prototype.getComments = function () {
    return this._comments;
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

Simulation.prototype.setPaperVisible = function (paperIsVisible) {
    this._paperIsVisible = paperIsVisible;
    console.log("Set visible mode to " + this._paperIsVisible);
}

Simulation.prototype.isPaperVisible = function () {
    return this._paperIsVisible;
}

Simulation.prototype.addComment = function (comment) {
    this._comments.unshift(comment);
};

module.exports = Simulation;

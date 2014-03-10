var Country = function (options) {
    this._ambassador = options.ambassador;
    this._id = options.id;
    this._members = options.members || [];
    this._name = options.name;
    // Position papers can have both a summary (just a body of text
    // that represents part of the position paper) and a single arbitrary
    // file that goes along with it.
    this._positionPaperSummary = options.positionPaperSummary || '';
    this._positionPaper = options.positionPaper;
    this._directives = options.directives || '';
    this._permanentMember = options.permanentMember || false;
};

Country.prototype.getId = function () {
    return this._id;
};

Country.prototype.setAmbassador = function (user) {
    if (user.isModerator()) {
        throw new Error('Moderators cannot belong to a team');
    }
    this._ambassador = user;
};

Country.prototype.setPermanentMember = function(perm) {
    if (perm === true) {
        this._permanentMember = true;
    } else {
        this._permanentMember = false;
    }
};

Country.prototype.isPermanentMember = function() {
    return this._permanentMember;
};

Country.prototype.getAmbassador = function () {
    return this._ambassador;
};

Country.prototype.addMember = function (user) {
    if (user.isModerator()) {
        throw new Error('Moderators cannot belong to a team');
    }
    this._members.push(user);
};

Country.prototype.getMembers = function () {
    return this._members;
};

Country.prototype.getName = function () {
    return this._name;
};

Country.prototype.flag = function () {
    return this._name.toLowerCase().replace(/ /g, '-') + '.svg';
};

Country.prototype.setPositionPaperSummary = function (summary) {
    this._positionPaperSummary = summary;
}

Country.prototype.getPositionPaperSummary = function () {
    return this._positionPaperSummary;
};

Country.prototype.setPositionPaper = function (positionPaper) {
    this._positionPaper = positionPaper;
};

Country.prototype.getPositionPaper = function () {
    return this._positionPaper;
};

Country.prototype.setDirectives = function (directives) {
    this._directives = directives;
    console.log("Set directives to " + directives);
};

Country.prototype.getDirectives = function () {
    return this._directives;
};

Country.names = [
    'Argentina',
    'Australia',
    'Chad',
    'Chile',
    'China',
    'France',
    'Jordan',
    'Lithuania',
    'Luxembourg',
    'Nigeria',
    'Republic of Korea',
    'Russia',
    'Rwanda',
    'United Kingdom',
    'United States of America'
];

Country.countries = function () {
    return Country.names
    .slice(0)
    .map(function (e, i) {
        return new Country({
            id: i,
            name: e
        });
    });
};

module.exports = Country;

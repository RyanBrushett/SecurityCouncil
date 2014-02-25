var Country = function (options) {
    this._ambassador = options.ambassador;
    this._id = options.id;
    this._members = options.members || [];
    this._name = options.name;
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

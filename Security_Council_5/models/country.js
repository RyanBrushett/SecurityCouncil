function Country(options) {
    options = options || {};
    this.ambassador = options.ambassador;
    this.directives = options.directives;
    this.id = options.id;
    this.members = options.members || [];
    this.name = options.name;
    this.flag = options.flag || (options.name && options.name.toLowerCase().replace(/ /g, '-') + '.svg');
    this.permanentMember = !!options.permanentMember;
    this.positionPaper = options.positionPaper;
};

Country.permanentMembers = [
    'China',
    'France',
    'Russia',
    'United Kingdom',
    'United States of America'
];

Country.names = Country.permanentMembers.concat([
    'Argentina',
    'Australia',
    'Chad',
    'Chile',
    'Jordan',
    'Lithuania',
    'Luxembourg',
    'Nigeria',
    'Republic of Korea',
    'Rwanda'
]).sort();

Country.countries = function () {
    return Country.names
    .slice(0)
    .map(function (e, i) {
        return new Country({id: i, name: e});
    });
};

module.exports = Country;

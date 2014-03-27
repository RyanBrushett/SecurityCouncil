function Simulation(options) {
    options = options || {};
    this.chairperson = options.chairperson;
    this.comments = options.comments || [];
    this.countries = options.countries || [];
    this.countriesSize = options.countriesSize || 2;
    this.id = options.id;
    this.motions = options.motions || [];
    this.name = options.name;
    this.paperIsViewable = !!options.paperIsViewable;
    this.resolution = options.resolution;
};

module.exports = Simulation;

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
    //this.voting = !!options.voting;
    //this.votingMotion = !!options.votingMotion;
    //this.votingResolution = !!options.votingResolution;
	this.communicationChannels = options.communicationChannels || [];
};

module.exports = Simulation;

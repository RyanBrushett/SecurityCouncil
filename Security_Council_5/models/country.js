var Country = function (options) {
	this._ambassador = options.ambassador;
	this._id = options.id;
	this._members = options.members || [];
	this._name = options.name;
	this._positionPaper = options.positionPaper || '';
	this._directives = options.directives || '';
	this._permanentMember = options.permanentMember || false;
};

Country.prototype.getId = function () {
	return this._id;
};

Country.prototype.setAmbassador = function (user) { // Manual override by Moderator.
	if (user.isModerator()) {
		throw new Error('Moderators cannot belong to a team');
	}
	this._ambassador = user;
};

Country.prototype.updateAmbassador = function () { // Election process by participants
	var votes = [];
	var vote_count = [];
	var majority = [-1, ""];
	var ambassador = "";
	for (var i = 0; i < this._members.length; i++) {
		var user_preference = this._members[i].getAmbassadorPreference();
		if(user_preference == ""){
			continue;
		}
		if(votes.indexOf(user_preference) < 0){
			votes[vote_count.length] = user_preference;
			vote_count[vote_count.length] = 0;
		}

		var index = votes.indexOf(user_preference);
		vote_count[index] = vote_count[index] + 1;

		if(vote_count[index] > this._members.length/2){
			ambassador = votes[index];
			continue;
		}
		else if(vote_count[index] > majority[0]){
			majority[0] = vote_count[index];
			majority[1] = votes[index];
		}
	}
	
	if(ambassador == ""){
		ambassador = majority[1];
	}
	
	for (var j = 0; j < this._members.length; j++) {
		if(this._members[j].getName() == ambassador){
			this._ambassador = this._members[j];
		}
		return;
	}
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

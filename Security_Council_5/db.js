var fs = require('fs');
var SQLite3 = require('sqlite3').verbose();

// Models

var models = {
    Comment: require('./models/comment'),
    CommunicationChannel: require('./models/communication'),
    Country: require('./models/country'),
    Motion: require('./models/motion'),
    Moderator: require('./models/moderator'),
    PositionPaper: require('./models/position'),
    Resolution: require('./models/resolution'),
    Simulation: require('./models/simulation'),
    User: require('./models/user'),
    Vote: require('./models/vote')
};

// Exposed data

module.exports.countries = models.Country.names;
module.exports.simulations = [];
module.exports.users = [];

// Database

var database = undefined;
module.exports.use = function (filename) {
    var exists = fs.existsSync(filename);
    database = new SQLite3.Database(filename);
    if (exists) {
        module.exports.load();
        return;
    }
    database.serialize(function () {
        Object.keys(models).forEach(function (e, i, a) {
            var tmp = new models[e]();
            var properties = Object.keys(tmp).sort();
            var tableName = tmp.constructor.name;
            database.run('CREATE TABLE ' + tableName + ' (' + properties.join(' TEXT, ') + ' TEXT)');
            if (properties.indexOf('id') >= 0) {
                database.run('CREATE UNIQUE INDEX ' + tableName + '_idx ON ' + tableName + ' (id)');
            }
        });
    });
    module.exports.fillWithData();
};

module.exports.save = function (obj) {
    if (!database) {
        return;
    }
    var columns = [];
    var values = [];
    var serialise = function (o) {
        if (o === undefined) {
            return JSON.stringify('NULL');
        }
        else if (Array.isArray(o)) {
            return JSON.stringify(o.map(serialise));
        }
        else if (o === Object(o) && Object.prototype.toString.call(o.id) === '[object Number]') {
            return JSON.stringify(o.constructor.name + '@' + o.id);
        }
        return JSON.stringify(o);
    };
    Object.keys(obj)
    .sort()
    .forEach(function (key) {
        columns.push('?');
        values.push(serialise(obj[key]));
    });
    var tableName = obj.constructor.name;
    database.serialize(function () {
        var sql = 'INSERT OR REPLACE INTO ' + tableName + ' VALUES(' + columns.join(', ') + ')';
        database.run(sql, values);
    });
};

module.exports.load = function () {
    console.log('Loading previous state');
    var cache = {};
    var count = 0;
    var fns = Object.keys(models).length;
    Object.keys(models)
    .sort()
    .forEach(function (model) {
        var tmp = new models[model]();
        var properties = Object.keys(tmp).sort();
        var tableName = tmp.constructor.name;
        cache[model] = [];
        database.serialize(function () {
            database.all('SELECT ' + properties.join(', ') + ' FROM ' + tableName, function(e, r) {
                if (e) {
                    return;
                }
                r.forEach(function (row) {
                    Object.keys(row).forEach(function (k) {
                        var value = JSON.parse(row[k]);
                        if (Array.isArray(value)) {
                            row[k] = value.map(function (e) {
                                return JSON.parse(e);
                            });
                        }
                        else if (value === 'NULL') {
                            row[k] = undefined;
                        }
                        else if (value === 'false') {
                            row[k] = false;
                        }
                        else {
                            row[k] = value;
                        }
                    });
                    cache[model].push(new models[model](row));
                });
                if (++count == fns) {
                    module.exports.loadCompleted(cache);
                }
            });
        });
    });
};

module.exports.loadCompleted = function (cache) {
    var getById = function (model, id) {
        id = id.split('@')[1];
        var m;
        cache[model].some(function (a) {
            if (a.id == id) {
                m = a;
                return true;
            }
            return false;
        });
        return m;
    };
    // Manually re-establish connections
    cache['Country'] = cache['Country'].map(function (country) {
        if (country.ambassador) {
            country.ambassador = getById('User', country.ambassador);
        }
        country.members = country.members.map(function (e) {
            return getById('User', e);
        });
        return country;
    });
    cache['Simulation'] = cache['Simulation'].map(function (simulation) {
        if (simulation.resolution) {
            simulation.resolution = getById('Resolution', simulation.resolution);
        }
        if (simulation.chairperson) {
            simulation.chairperson = getById('User', simulation.chairperson);
        }
        simulation.countries = simulation.countries.map(getById.bind(undefined, 'Country'));
        return simulation;
    });
    // TODO: Moar relationships
    // I will wait until they are finalized first
    module.exports.simulations = cache['Simulation'];
    module.exports.users = cache['User'].concat(cache['Moderator']);
    console.log('Previous state loaded');
};

// Helpers

var helpers = module.exports.helpers = {};

helpers.updateAmbassador = function (country) {
    var countryMembers = country.members;
    var votes = [];
    var noPreference = 0;
    var voteCount = [];
    var majority = [1, undefined];
    var ambassador;
    var i, numberOfMembers = countryMembers.length;
    var userPreference;
    for (i = 0; i < numberOfMembers; i++) {
        var userPreference = countryMembers[i].ambassadorPreference;
        if (!userPreference) {
            noPreference++;
            continue;
        }
        if (votes.indexOf(userPreference) < 0) {
            votes[voteCount.length] = userPreference;
            voteCount[voteCount.length] = 0;
        }
        var index = votes.indexOf(userPreference);
        voteCount[index] = voteCount[index] + 1;
        if (noPreference > numberOfMembers / 2) {
            return;
        }
        if (voteCount[index] > numberOfMembers / 2) {
            ambassador = votes[index];
            continue;
        }
        else if (voteCount[index] > majority[0]) {
            majority[0] = voteCount[index];
            majority[1] = votes[index];
        }
    }
    if (!ambassador) {
        ambassador = majority[1];
    }
    for (var i = 0; i < numberOfMembers; i++) {
        if (countryMembers[i].name == ambassador) {
            country.ambassador = countryMembers[i];
            break;
        }
    }
    module.exports.save(country);
};

helpers.createVote = function (votable, options) {
    var vote = new models.Vote(options);
    votable.votes.push(vote);
    module.exports.save(vote);
};

helpers.createUser = function (options) {
    options.id = module.exports.users.length;
    var user = new models.User(options);
    module.exports.save(user);
    module.exports.users.push(user);
    return user;
};

helpers.createModerator = function (options) {
    options.id = module.exports.users.length;
    var user = new models.Moderator(options);
    module.exports.save(user);
    module.exports.users.push(user);
    return user;
};

var count = 0;
helpers.createResolution = function (simulation, options) {
    options.id = count++;
    var r = new models.Resolution(options);
    simulation.resolution = r;
    module.exports.save(r);
    module.exports.save(simulation);
    return r;
};

helpers.createComment = function (simulation, options) {
    options.id = simulation.comments.length;
    var comment = new models.Comment(options);
    module.exports.save(comment);
    simulation.comments.unshift(comment);
    module.exports.save(simulation);
    return comment;
};

helpers.createSimulation = function (options) {
    options.id = module.exports.simulations.length;
    options.countries = models.Country.countries();
    options.countries.forEach(module.exports.save);
    var simulation = new models.Simulation(options);
    module.exports.save(simulation);
    module.exports.simulations.push(simulation);
    return simulation;
};

helpers.createMotion = function (simulation, options) {
    options.id = simulation.motions.length;
    var motion = new models.Motion(options);
    module.exports.save(motion);
    simulation.motions.push(new models.Motion(options));
    module.exports.save(simulation);
    return motion;
};

helpers.setChairperson = function (simulation, chairperson) {
    chairperson.chair = true;
    simulation.chairperson = chairperson;
    module.exports.save(chairperson);
    module.exports.save(simulation);
};

helpers.isUserAmbassador = function(simulation, user) {
    return simulation.countries.some(function (country) {
        return country.ambassador === user;
    });
};

helpers.isUserCountryPermanent = function(simulation, user) {
    var countries = simulation.countries;
    var i;
    for (i = 0; i < countries.length; i++) {
        if (countries[i].members.indexOf(user) >= 0 && models.Country.permanentMembers.indexOf(countries[i].name) >= 0) {
            return true;
        }
    }
    return false;
};

helpers.getUserCountry = function(simulation, user) {
    var countries = simulation.countries;
    var i;
    for (i = 0; i < countries.length; i++) {
        if (countries[i].members.indexOf(user) >= 0) {
            return countries[i];
        }
    }
};

helpers.userIsMemberOfCountry = function (country, user) {
    return country.members.some(function (member) {
        return member.id == user.id;
    });
};

helpers.userIsAmbassadorOfCountry = function (country, user) {
    return (country.ambassador && (country.ambassador.id == user.id));
};

helpers.setUserFlag = function (simulation, user) {
    var i, j, members;
    for (i = 0; i < simulation.countries.length; i++) {
        members = simulation.countries[i].members;
        for (j = 0; j < members.length; j++) {
            if (user.id == members[j].id) {
                user.flag = simulation.countries[i].flag;
            }
        }
    }
};

helpers.hasUserVoted = function(votable, user) {
    return votable.votes.some(function (vote) {
        return (vote.user === user);
    });
};

helpers.addUserToSimulation = function (simulation, user) {
    if (user.moderator) {
        return;
    }
    var countries = simulation.countries;
    var perCountry = simulation.countriesSize;
    var p1length;
    var p1id;
    var p2length;
    var p2id;
    var p3length;
    var p3id;
    var i, j, count, idx;
    for (j = 0; j < countries.length; j++) {
        if (countries[j].name === user.preferences[0]) {
            p1length = countries[j].members.length;
            p1id = j;
        } else if (countries[j].name === user.preferences[1]) {
            p2length = countries[j].members.length;
            p2id = j;
        } else if (countries[j].name === user.preferences[2]) {
            p3length = countries[j].members.length;
            p3id = j;
        }
    }
    if (p1length < perCountry) {
        countries[p1id].members.push(user);
        module.exports.save(countries[p1id]);
    } else if (p2length < perCountry) {
        countries[p2id].members.push(user);
        module.exports.save(countries[p2id]);
    } else if (p3length < perCountry) {
        countries[p3id].members.push(user);
        module.exports.save(countries[p3id]);
    } else {
        count = Math.floor(Math.random() * countries.length);
        for (i = 0; i < countries.length; i++) {
            if (countries[(i + count) % countries.length].members.length < perCountry) {
                countries[(i + count) % countries.length].members.push(user);
                module.exports.save(countries[(i + count) % countries.length]);
                return;
            }
        }
        idx = Math.floor(Math.random() * countries.length);
        countries[idx].members.push(user);
        module.exports.save(countries[idx]);
    }
};

helpers.checkVotingPermissions = function (simulation, user) {
    var s = simulation;
    s.voting = false;
    s.votingMotion = false;
    s.votingResolution = false;
    var i, motions = s.motions;
    for (i = 0; i < motions.length; i++) {
        if (motions[i].inVote && !motions[i].inDebate) {
            s.voting = true;
            s.votingMotion = true;
            s.motionToVote = motions[i];
            if (!helpers.hasUserVoted(motions[i], user)) {
                s.hasNotVoted = true;
                s.userCanVote = helpers.isUserAmbassador(s, user);
            }
            else {
                s.hasNotVoted = false;
                s.userCanVote = false;
            }
        }
    }
    if ((s.votingMotion === false) && s.resolution.inVote) {
        s.voting = true;
        s.votingResolution = true;
        if (!helpers.hasUserVoted(s.resolution, user)) {
            s.hasNotVoted = true;
            s.userCanVote = helpers.isUserAmbassador(s, user);
        }
        else {
            s.hasNotVoted = false;
            s.userCanVote = false;
        }
    }
};

helpers.createCommunicationChannel = function (simulation, users) {
    return;
};

// Filler data

module.exports.fillWithData = function () {
    var users = [
        {
            name: 'Ryan B',
            username: 'ryanb',
            preferences: ['United Kingdom', 'Australia', 'China']
        }, {
            name: 'Uche E',
            username: 'uche',
            preferences: ['France', 'Rwanda', 'Chad']
        }, {
            name: '"Dan"',
            username: 'dan',
            preferences: ['Argentina', 'Australia', 'Chad']
        }, {
            name: 'Bukunola',
            username: 'bukunola',
            preferences: ['Nigeria', 'Australia', 'Russia']
        }, {
            name: 'Frankie S',
            username: 'frankie',
            preferences: ['Chile', 'Australia', 'Jordan']
        }, {
            name: 'Alexandria',
            username: 'alexandria',
            preferences: ['Argentina', 'Lithuania', 'France']
        }, {
            name: 'Raoul',
            username: 'raoulh',
            preferences: ['United States of America', 'Russia', 'United Kingdom']
        }, {
            name: 'Josephine',
            username: 'josephine',
            preferences: ['United States of America', 'Luxembourg', 'Chad']
        }, {
            name: 'Bennett',
            username: 'ben',
            preferences: ['Argentina', 'Chile', 'Chile']
        }, {
            name: 'Muhammad',
            username: 'muhammad',
            preferences: ['Argentina', 'Australia', 'Chad']
        }, {
            name: 'Legolas',
            username: 'legolas',
            preferences: ['Nigeria', 'Australia', 'Chad']
        }, {
            name: 'Jacqueline',
            username: 'jackie',
            preferences: ['Argentina', 'Australia', 'Chad']
        }, {
            name: 'Adrienne',
            username: 'adrienne',
            preferences: ['Argentina', 'Nigeria', 'Chad']
        }, {
            name: 'Avis Pang',
            username: 'avisp',
            preferences: ['Argentina', 'Australia', 'Chad']
        }, {
            name: 'Nicolasa',
            username: 'ncarver',
            preferences: ['Nigeria', 'Australia', 'Chad']
        }, {
            name: 'Gwyndolyn',
            username: 'gwyn',
            preferences: ['Luxembourg', 'Australia', 'Chad']
        }, {
            name: 'Regina B',
            username: 'rbalk',
            preferences: ['Argentina', 'Australia', 'Chad']
        }, {
            name: 'Lena Hockenberry',
            username: 'lenah',
            preferences: ['United Kingdom', 'Australia', 'Chad']
        }, {
            name: 'Shelly',
            username: 'sheldons',
            preferences: ['United Kingdom', 'Australia', 'Chad']
        }, {
            name: 'Bonita Bowdoin',
            username: 'bbowdoin',
            preferences: ['Argentina', 'Australia', 'Chad']
        }, {
            name: 'Renea M',
            username: 'renea',
            preferences: ['Luxembourg', 'Australia', 'Rwanda']
        }, {
            name: 'Shawanda Gracey',
            username: 'sgracey',
            preferences: ['Russia', 'Australia', 'Chad']
        }, {
            name: 'Isabelle P',
            username: 'isabelle',
            preferences: ['Rwanda', 'Luxembourg', 'Chad']
        }, {
            name: 'Deangelo M',
            username: 'deangelo',
            preferences: ['Russia', 'Australia', 'Chad']
        }, {
            name: 'Sharon J',
            username: 'sharonj',
            preferences: ['Argentina', 'Russia', 'Chad']
        }, {
            name: 'Josef Maston',
            username: 'jmaston',
            preferences: ['Rwanda', 'Luxembourg', 'Chad']
        }, {
            name: 'Randolph T',
            username: 'rtanaguchi',
            preferences: ['Argentina', 'China', 'Chad']
        }, {
            name: 'Valerno N',
            username: 'valerno',
            preferences: ['China', 'Republic of Korea', 'Chad']
        }, {
            name: 'Austin',
            username: 'austin',
            preferences: ['Argentina', 'Rwanda', 'Chad']
        }, {
            name: 'Javier Yokum',
            username: 'jyokum',
            preferences: ['Republic of Korea', 'Australia', 'Chad']
        }, {
            name: 'Reed B',
            username: 'reedb',
            preferences: ['Argentina', 'China', 'Chad']
        }, {
            name: 'Jamey J',
            username: 'jjune',
            preferences: ['China', 'Australia', 'Chad']
        }, {
            name: 'Chuck Primrose',
            username: 'cprimrose',
            preferences: ['Argentina', 'Republic of Korea', 'Chad']
        }, {
            name: 'Guillermo K',
            username: 'guillermo',
            preferences: ['Republic of Korea', 'Rwanda', 'Chad']
        }, {
            name: 'Vernon Kratochvil',
            username: 'vernon',
            preferences: ['Argentina', 'Australia', 'Chad']
        }, {
            name: 'Andreas',
            username: 'andreas',
            preferences: ['Jordan', 'United Kingdom', 'Republic of Korea']
        }
    ];
    // Create filler users
    users.map(helpers.createUser);
    helpers.createModerator({
        name: 'Dr. Fiech',
        username: 'fiech'
    });
    var s1 = helpers.createSimulation({name: 'Political Science 2200'});
    var s2 = helpers.createSimulation({name: 'Political Science 3220'});
    helpers.createResolution(s1, {
        title: 'S/RES/2139(2013)',
        content: 'The Security Council,\n\nRecalling its resolutions 2042 (2012), 2043 (2012) and 2118 (2013), and its presidential statements of 3 August 2011, 21 March 2012, 5 April 2012 and 2 October 2013,\n\nReaffirming its strong commitment to the sovereignty, independence, unity and territorial integrity of Syria, and to the purposes and principles of the Charter of the United Nations,\n\nBeing appalled at the unacceptable and escalating level of violence and the death of well over 100,000 people in Syria, including over 10,000 children, as reported by the UN Secretary-General and the Special Representative of the Secretary-General for Children and Armed Conflict,\n\nExpressing grave alarm at the significant and rapid deterioration of the humanitarian situation in Syria, in particular the dire situation of hundreds of thousands of civilians trapped in besieged areas, most of whom are besieged by the Syrian armed forces and some by opposition groups, as well as the dire situation of over 3 million people in hard-to-reach areas, and deploring the difficulties in providing, and the failure to provide, access for the humanitarian assistance to all civilians in need inside Syria,\n\nEmphasizing the need to respect the UN guiding principles of humanitarian emergency assistance and stressing the importance of such assistance being delivered on the basis of need, devoid of any political prejudices and aims, commending the efforts of the United Nations and all humanitarian and medical personnel in Syria and in neighbouring countries, and condemning all acts or threats of violence against United Nations staff and humanitarian actors, which have resulted in the death, injury and detention of many humanitarian personnel,\n\nExpressing grave concern at the increasing number of refugees and internally displaced persons caused by the conflict in Syria, which has a destabilising impact on the entire region, and underscoring its appreciation for the significant and admirable efforts that have been made by the countries of the region, notably Lebanon, Jordan, Turkey, Iraq and Egypt, to accommodate the more than 2.4 million refugees who have fled Syria as a result of the on-going violence, while acknowledging the enormous political, socioeconomic and financial impact of the presence of large-scale populations in these countries, and underscoring the need for all parties to respect and maintain the security and civilian character of camps for refugees and internally displaced persons,\n\Welcoming the pledges totalling $2.5 billion at the Second International Humanitarian Pledging Conference for Syria, hosted by Kuwait on 15 January 2014, and expressing its appreciation to Member States and regional and subregional organizations that have pledged to provide humanitarian assistance to people in need in all parts of Syria, including internally displaced persons, as well as to refugees in neighbouring host countries, and calling on all Member States to ensure the timely disbursement of pledges and continued support in line with growing humanitarian needs,\n\nCalling on all parties to immediately end all violence which has led to human suffering in Syria, save Syrias rich societal mosaic and cultural heritage, and take appropriate steps to ensure the protection of Syrias World Heritage Sites,\n\nStrongly condemning the increased terrorist attacks resulting in numerous casualties and destruction carried out by organizations and individuals associated with Al-Qaida, its affiliates and other terrorist groups, and reiterating its call on all parties to commit to putting an end to terrorist acts perpetrated by such organizations and individuals, while reaffirming that terrorism in all its forms and manifestations constitutes one of the most serious threats to international peace and security, and that any acts of terrorism are criminal and unjustifiable, regardless of their motivation, wherever, whenever and by whomsoever committed,\n\nExpressing its regret that its presidential statement of 2 October 2013 (S/PRST/2013/15) has not delivered as expected and has not yet translated into meaningful progress on the ground, and that humanitarian aid delivery continues to be impeded throughout Syria, while condemning all cases of denial of humanitarian access and recalling that arbitrary denial of humanitarian access and depriving civilians of objects indispensable to their survival, including wilfully impeding relief supply and access, can constitute a violation of international humanitarian law,\n\nEmphasizing that the humanitarian situation will continue to deteriorate in the absence of a political solution to the crisis, reiterating its endorsement of the Geneva Communique of 30 June 2012 (Annex II of Resolution 2118 (2113)) and demanding that all parties work towards the immediate and comprehensive implementation of the Geneva Communique aimed at bringing an immediate end to all violence, violations and abuses of human rights and violations of international law, and facilitating the Syrian-led political process launched in Montreux on 22 January 2014, leading to a transition that meets the legitimate aspirations of the Syrian people and enables them independently and democratically to determine their own future,\n\n1.   Strongly condemns the widespread violations of human rights and international humanitarian law by the Syrian authorities, as well as the human rights abuses and violations of international humanitarian law by armed groups, including all forms of sexual and gender-based violence, as well as all grave violations and abuses committed against children in contravention of applicable international law, such as recruitment and use, killing and maiming, rape, attacks on schools and hospitals as well as arbitrary arrest, detention, torture, ill treatment and use as human shields, as described in the United Nations Secretary-Generals report on children and armed conflict in Syria (S/2014/31);\n\n2.   Demands that all parties immediately put an end to all forms of violence, irrespective of where it comes from, cease and desist from all violations of international humanitarian law and violations and abuses of human rights, and reaffirm their obligations under international humanitarian law and international human rights law, and stresses that some of these violations may amount to war crimes and crimes against humanity;\n\n3.   Demands that all parties immediately cease all attacks against civilians, as well as the indiscriminate employment of weapons in populated areas, including shelling and aerial bombardment, such as the use of barrel bombs, and methods of warfare which are of a nature to cause superfluous injury or unnecessary suffering, and recalls in this regard the obligation to respect and ensure respect for international humanitarian law in all circumstances, and further recalls, in particular, the obligation to distinguish between civilian populations and combatants, and the prohibition against indiscriminate attacks, and attacks against civilians and civilian objects as such;\n\n4.   Demands that all parties, in particular the Syrian authorities, fully implement the provisions of the 2 October 2013 statement by the President of the Security Council (S/PRST/2013/15) including through facilitating the expansion of humanitarian relief operations, in accordance with applicable provisions of international humanitarian law and the UN guiding principles of humanitarian emergency assistance;\n\n5.   Calls upon all parties to immediately lift the sieges of populated areas, including in the Old City of Homs (Homs), Nubl and Zahra (Aleppo), Madamiyet Elsham (Rural Damascus), Yarmouk (Damascus), Eastern Ghouta (Rural Damascus), Darayya (Rural Damascus) and other locations, and demands that all parties allow the delivery of humanitarian assistance, including medical assistance, cease depriving civilians of food and medicine indispensable to their survival, and enable the rapid, safe and unhindered evacuation of all civilians who wish to leave, and underscores the need for the parties to agree on humanitarian pauses, days of tranquillity, localised cease-fires and truces to allow humanitarian agencies safe and unhindered access to all affected areas in Syria, recalling that starvation of civilians as a method of combat is prohibited by international humanitarian law;\n\n6.   Demands that all parties, in particular the Syrian authorities, promptly allow rapid, safe and unhindered humanitarian access for UN humanitarian agencies and their implementing partners, including across conflict lines and across borders, in order to ensure that humanitarian assistance reaches people in need through the most direct routes;\n\n7.   Urges all parties, in particular the Syrian authorities, to take all appropriate steps to facilitate the efforts of the United Nations, its specialized agencies, and all humanitarian actors engaged in humanitarian relief activities, to provide immediate humanitarian assistance to the affected people in Syria, including by promptly facilitating safe and unhindered humanitarian access to populations in need of assistance in all areas under their control, and encourages further cooperation between the United Nations, its specialized agencies and all parties concerned, including Syrian civil society organisations, to facilitate access and the delivery of assistance in the entirety of the Syrian territory;\n\n8.   Demands that all parties respect the principle of medical neutrality and facilitate free passage to all areas for medical personnel, equipment, transport and supplies, including surgical items, and recalls that under international humanitarian law, the wounded and sick must receive, to the fullest extent practicable, and with the least possible delay, medical care and attention required by their condition and that medical and humanitarian personnel, facilities and transport must be respected and protected, and expresses grave concern in this regard at the removal of medical supplies from humanitarian shipments;\n\n9.   Also demands that all parties take all appropriate steps to protect civilians, including members of ethnic, religious and confessional communities, and stresses that, in this regard, the primary responsibility to protect its population lies with the Syrian authorities;\n\n10.  Further demands that all parties demilitarize medical facilities, schools and other civilian facilities and avoid establishing military positions in populated areas and desist from attacks directed against civilian objects;\n\n11.  Strongly condemns the arbitrary detention and torture of civilians in Syria, notably in prisons and detention facilities, as well as the kidnappings, abductions and forced disappearances, and demands the immediate end of these practices and the release of all arbitrarily detained persons starting with women and children, as well as sick, wounded and elderly people and including UN personnel and journalists;\n\n12.  Urges all parties to take all appropriate steps to ensure the safety and security of United Nations personnel, those of its specialized agencies, and all other personnel engaged in humanitarian relief activities, without prejudice to their freedom of movement and access, stresses that the primary responsibility in this regard lies with the Syrian authorities and further stresses the need not to impede these efforts;\n\n13.  Stresses the need to end impunity for violations of international humanitarian law and violations and abuses of human rights, and reaffirms that those who have committed or are otherwise responsible for such violations and abuses in Syria must be brought to justice;\n\n14.  Strongly condemns the increased terrorist attacks resulting in numerous casualties and destruction carried out by organisations and individuals associated with Al-Qaida, its affiliates and other terrorist groups, urges the opposition groups to maintain their rejection of these organizations and individuals which are responsible for serious violations of international humanitarian law in opposition-held areas, calls upon the Syrian authorities and opposition groups to commit to combating and defeating organizations and individuals associated with Al-Qaida, its affiliates and other terrorist groups, demands that all foreign fighters immediately withdraw from Syria, and reaffirms that terrorism in all its forms and manifestations constitutes one of the most serious threats to international peace and security, and that any acts of terrorism are criminal and unjustifiable, regardless of their motivation, wherever, whenever and by whomsoever committed;\n\n15.  Emphasizes that the humanitarian situation will continue to deteriorate in the absence of a political solution, welcomes in this regard the Geneva Conference on Syria launched in Montreux on 22 January 2014, and demands that all parties work towards the comprehensive implementation of the Geneva Communiqu of 30 June 2012 leading to a genuine political transition that meets the legitimate aspirations of the Syrian people and enables them independently and democratically to determine their own future, and further stresses that rapid progress on a political solution should include full participation by all groups and segments of Syrian society, including women, and represents the only sustainable opportunity to resolve the situation in Syria peacefully, and that the implementation of this resolution is key to meeting the humanitarian needs of the Syrian people;\n\n16.  Urges all Member States to contribute or increase their support to the United Nations humanitarian appeals to meet the spiralling needs of people affected by the crisis, and to provide this support in coordination with the relevant United Nations agencies, and to ensure that all pledges are honoured in full, and further urges all Member States, based on burden sharing principles, to support the neighbouring host countries to enable them to respond to the growing humanitarian needs, including by providing direct support;\n\n17.  Requests the Secretary-General to report to the Council on the implementation of this resolution by all parties in Syria, in particular paragraphs 2 through 12, in 30 days of its adoption and every 30 days thereafter, and upon receipt of the Secretary-Generals report, expresses its intent to take further steps in the case of non-compliance with this resolution;\n\n18.  Decides to remain actively seized of the matter.'
    });
    helpers.createResolution(s2, {
        title: 'S/RES/2133(2013)',
        content: 'The General Assembly,\n\nReminding all nations of the celebration of the 50th anniversary of the Universal Declaration of Human Rights, which recognizes the inherent dignity, equality and inalienable rights of all global citizens,\n\nReaffirming its Resolution 33/1996 of 25 July 1996, which encourages Governments to work with UN bodies aimed at improving the coordination and effectiveness of humanitarian assistance,\n\nNoting with satisfaction the past efforts of various relevant UN bodies and nongovernmental organizations,\n\nStressing the fact that the United Nations faces significant financial obstacles and is in need of reform, particularly in the humanitarian realm,\n\nEncourages all relevant agencies of the United Nations to collaborate more closely with countries at the grassroots level to enhance the carrying out of relief efforts;\n\nUrges member states to comply with the goals of the UN Department of Humanitarian Affairs to streamline efforts of humanitarian aid;<br/>Requests that all nations develop rapid deployment forces to better enhance the coordination of relief efforts of humanitarian assistance in complex emergencies;\n\nCalls for the development of a United Nations Trust Fund that encourages voluntary donations from the private transnational sector to aid in funding the implementation of rapid deployment forces;\n\nStresses the continuing need for impartial and objective information on the political, economic and social situations and events of all countries;\n\nCalls upon states to respond quickly and generously to consolidated appeals for humanitarian assistance; and \n\n Requests the expansion of preventive actions and assurance of post-conflict assistance through reconstruction and development.'
    });
    users.forEach(function (user) {
        helpers.addUserToSimulation(s1, user);
        helpers.addUserToSimulation(s2, user);
    });
};

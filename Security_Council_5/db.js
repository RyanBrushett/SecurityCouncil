var Country = require('./models/country');
var Resolution = require('./models/resolution');
var Simulation = require('./models/simulation');
var User = require('./models/user');

// Database methods can go here

var users = [
    new User({
        id: 0,
        name: 'Ryan B',
        username: 'ryanb'
    }),
    new User({
        id: 1,
        name: 'Uche',
        username: 'uche'
    }),
    new User({
        id: 2,
        name: '"Dan"',
        username: 'dan',
        moderator: true
    }),
    new User({
        id: 3,
        name: 'Bukunola',
        username: 'bukunola'
    }),
    new User({
        id: 4,
        name: 'Ryan M',
        username: 'ryanm'
    })
];

var x = Country.countries();
x[3].addMember(users[0]);
x[7].addMember(users[1]);
x[2].addMember(users[3]);
x[0].addMember(users[4]);

var y = Country.countries();
y[2].addMember(users[0]);
y[9].addMember(users[1]);
y[5].addMember(users[3]);
y[6].addMember(users[4]);

var simulations = [
    new Simulation({
        id: 0,
        countries: x,
        name: 'Political Science 2200',
        resolution: new Resolution({
            title: 'The fake resolution for POSC 2200',
            content: 'Lorem ipsum dolor sit amet 2200'
        })
    }),
    new Simulation({
        id: 1,
        countries: y,
        name: 'Political Science 3220',
        resolution: new Resolution({
            title: 'The fake resolution for POSC 3220',
            content: 'Lorem ipsum dolor sit amet 3220'
        })
    })
];

// The database

module.exports = {
    countries: Country.names,
    simulations: simulations,
    users: users
};

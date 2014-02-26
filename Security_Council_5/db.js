var Country = require('./models/country');
var Resolution = require('./models/resolution');
var Simulation = require('./models/simulation');
var User = require('./models/user');

// Fake data

var users = [
    new User({
        id: 0,
        name: 'Ryan B',
        username: 'ryanb'
    }),
    new User({
        id: 1,
        name: 'Uche E',
        username: 'uche'
    }),
    new User({
        id: 2,
        name: '"Dan"',
        username: 'dan'
    }),
    new User({
        id: 3,
        name: 'Bukunola',
        username: 'bukunola'
    }),
    new User({
        id: 4,
        name: 'Frankie S',
        username: 'frankie'
    }),
    new User({
        id: 5,
        name: 'Alexandria',
        username: 'alexandria'
    }),
    new User({
        id: 6,
        name: 'Raoul',
        username: 'raoulh'
    }),
    new User({
        id: 7,
        name: 'Josephine',
        username: 'josephine'
    }),
    new User({
        id: 8,
        name: 'Bennett',
        username: 'ben'
    }),
    new User({
        id: 9,
        name: 'Muhammad',
        username: 'muhammad'
    }),
    new User({
        id: 10,
        name: 'Legolas',
        username: 'legolas'
    }),
    new User({
        id: 11,
        name: 'Jacqueline',
        username: 'jackie'
    }),
    new User({
        id: 12,
        name: 'Adrienne',
        username: 'adrienne'
    }),
    new User({
        id: 13,
        name: 'Avis Pang',
        username: 'avisp'
    }),
    new User({
        id: 14,
        name: 'Nicolasa',
        username: 'ncarver'
    }),
    new User({
        id: 15,
        name: 'Gwyndolyn',
        username: 'gwyn'
    }),
    new User({
        id: 16,
        name: 'Regina B',
        username: 'rbalk'
    }),
    new User({
        id: 17,
        name: 'Lena Hockenberry',
        username: 'lenah'
    }),
    new User({
        id: 18,
        name: 'Shelly',
        username: 'sheldons'
    }),
    new User({
        id: 19,
        name: 'Benita Bowdoin',
        username: 'bbowdoin'
    }),
    new User({
        id: 20,
        name: 'Renea M',
        username: 'renea'
    }),
    new User({
        id: 21,
        name: 'Shawanda Gracey',
        username: 'sgracey'
    }),
    new User({
        id: 22,
        name: 'Isabelle P',
        username: 'isabelle'
    }),
    new User({
        id: 23,
        name: 'Deangelo M',
        username: 'deangelo'
    }),
    new User({
        id: 24,
        name: 'Sharon J',
        username: 'sharonj'
    }),
    new User({
        id: 25,
        name: 'Josef Maston',
        username: 'jmaston'
    }),
    new User({
        id: 26,
        name: 'Randolph T',
        username: 'rtanaguchi'
    }),
    new User({
        id: 27,
        name: 'Valerno N',
        username: 'valerno'
    }),
    new User({
        id: 28,
        name: 'Austin',
        username: 'austin'
    }),
    new User({
        id: 29,
        name: 'Javier Yokum',
        username: 'jyokum'
    }),
    new User({
        id: 30,
        name: 'Reed B',
        username: 'reedb'
    }),
    new User({
        id: 31,
        name: 'Jamey J',
        username: 'jjune'
    }),
    new User({
        id: 32,
        name: 'Chuck Primrose',
        username: 'cprimrose'
    }),
    new User({
        id: 33,
        name: 'Guillermo K',
        username: 'guillermo'
    }),
    new User({
        id: 34,
        name: 'Vernon Kratochvil',
        username: 'vernon'
    }),
    new User({
        id: 35,
        name: 'Andreas',
        username: 'andreas'
    }),
    new User({
        id: 36,
        name: 'Fiech',
        username: 'fiech',
        moderator: true
    })
];

/** The following code block adds the above sample users to each country
 *  iteratively. countrySetResolution1 defines the set of countries used
 *  for the first simulation room.
 */
var countrySetSimulation1 = Country.countries();
var countrySetSimulation2 = Country.countries();
var peopleCounter;
var countryCounter;
//for each person, add that person to a country, then increase the country number./
//if the country number eclipses 15, reset it back.
//if you run out of people, stop.
for (peopleCounter = 0, countryCounter = 0; peopleCounter < 34; peopleCounter++) {
    countrySetSimulation1[countryCounter].addMember(users[peopleCounter]);
    countryCounter++;
    if (countryCounter == 15) {
        countryCounter = 0;
    }
}

for (peopleCounter = 33, countryCounter = 0; peopleCounter >= 0; peopleCounter--) {
    countrySetSimulation2[countryCounter].addMember(users[peopleCounter]);
    countryCounter++;
    if (countryCounter == 15) {
        countryCounter = 0;
    }
}


/*for (countryCounter = 0, peopleCounter = 34; countryCounter < 15 && peopleCounter > 0; countryCounter++, peopleCounter--) {
    countrySetSimulation2[countryCounter].addMember(users[peopleCounter]);
}*/

var simulations = [
    new Simulation({
        id: 0,
        countries: countrySetSimulation1,
        name: 'Political Science 2200',
        resolution: new Resolution({
            title: 'S/RES/2133(2013)',
            content: 'The General Assembly,<br><br> Reminding all nations of the celebration of the 50th anniversary of the Universal Declaration of Human Rights, which recognizes the inherent dignity, equality and inalienable rights of all global citizens,<br><br>Reaffirming its Resolution 33/1996 of 25 July 1996, which encourages Governments to work with UN bodies aimed at improving the coordination and effectiveness of humanitarian assistance,<br><br>Noting with satisfaction the past efforts of various relevant UN bodies and nongovernmental organizations,<br><br>Stressing the fact that the United Nations faces significant financial obstacles and is in need of reform, particularly in the humanitarian realm,<br><br>Encourages all relevant agencies of the United Nations to collaborate more closely with countries at the grassroots level to enhance the carrying out of relief efforts; <br><br>Urges member states to comply with the goals of the UN Department of Humanitarian Affairs to streamline efforts of humanitarian aid;<br/>Requests that all nations develop rapid deployment forces to better enhance the coordination of relief efforts of humanitarian assistance in complex emergencies;<br><br>Calls for the development of a United Nations Trust Fund that encourages voluntary donations from the private transnational sector to aid in funding the implementation of rapid deployment forces;<br><br>Stresses the continuing need for impartial and objective information on the political, economic and social situations and events of all countries;<br><br>Calls upon states to respond quickly and generously to consolidated appeals for humanitarian assistance; and <br><br> Requests the expansion of preventive actions and assurance of post-conflict assistance through reconstruction and development.'
        })
    }),
    new Simulation({
        id: 1,
        countries: countrySetSimulation2,
        name: 'Political Science 3220',
        resolution: new Resolution({
            title: 'S/RES/2139(2013)',
            content: 'The Security Council,<br><br>Recalling its resolutions 2042 (2012), 2043 (2012) and 2118 (2013), and its presidential statements of 3 August 2011, 21 March 2012, 5 April 2012 and 2 October 2013,<br><br>Reaffirming its strong commitment to the sovereignty, independence, unity and territorial integrity of Syria, and to the purposes and principles of the Charter of the United Nations,<br><br>Being appalled at the unacceptable and escalating level of violence and the death of well over 100,000 people in Syria, including over 10,000 children, as reported by the UN Secretary-General and the Special Representative of the Secretary-General for Children and Armed Conflict,<br><br>Expressing grave alarm at the significant and rapid deterioration of the humanitarian situation in Syria, in particular the dire situation of hundreds of thousands of civilians trapped in besieged areas, most of whom are besieged by the Syrian armed forces and some by opposition groups, as well as the dire situation of over 3 million people in hard-to-reach areas, and deploring the difficulties in providing, and the failure to provide, access for the humanitarian assistance to all civilians in need inside Syria,<br><br>Emphasizing the need to respect the UN guiding principles of humanitarian emergency assistance and stressing the importance of such assistance being delivered on the basis of need, devoid of any political prejudices and aims, commending the efforts of the United Nations and all humanitarian and medical personnel in Syria and in neighbouring countries, and condemning all acts or threats of violence against United Nations staff and humanitarian actors, which have resulted in the death, injury and detention of many humanitarian personnel,<br><br>Expressing grave concern at the increasing number of refugees and internally displaced persons caused by the conflict in Syria, which has a destabilising impact on the entire region, and underscoring its appreciation for the significant and admirable efforts that have been made by the countries of the region, notably Lebanon, Jordan, Turkey, Iraq and Egypt, to accommodate the more than 2.4 million refugees who have fled Syria as a result of the on-going violence, while acknowledging the enormous political, socioeconomic and financial impact of the presence of large-scale populations in these countries, and underscoring the need for all parties to respect and maintain the security and civilian character of camps for refugees and internally displaced persons,<br><br>Welcoming the pledges totalling $2.5 billion at the Second International Humanitarian Pledging Conference for Syria, hosted by Kuwait on 15 January 2014, and expressing its appreciation to Member States and regional and subregional organizations that have pledged to provide humanitarian assistance to people in need in all parts of Syria, including internally displaced persons, as well as to refugees in neighbouring host countries, and calling on all Member States to ensure the timely disbursement of pledges and continued support in line with growing humanitarian needs,<br><br>Calling on all parties to immediately end all violence which has led to human suffering in Syria, save Syria’s rich societal mosaic and cultural heritage, and take appropriate steps to ensure the protection of Syria’s World Heritage Sites,<br><br>Strongly condemning the increased terrorist attacks resulting in numerous casualties and destruction carried out by organizations and individuals associated with Al-Qaida, its affiliates and other terrorist groups, and reiterating its call on all parties to commit to putting an end to terrorist acts perpetrated by such organizations and individuals, while reaffirming that terrorism in all its forms and manifestations constitutes one of the most serious threats to international peace and security, and that any acts of terrorism are criminal and unjustifiable, regardless of their motivation, wherever, whenever and by whomsoever committed,<br><br>Expressing its regret that its presidential statement of 2 October 2013 (S/PRST/2013/15) has not delivered as expected and has not yet translated into meaningful progress on the ground, and that humanitarian aid delivery continues to be impeded throughout Syria, while condemning all cases of denial of humanitarian access and recalling that arbitrary denial of humanitarian access and depriving civilians of objects indispensable to their survival, including wilfully impeding relief supply and access, can constitute a violation of international humanitarian law,<br><br>Emphasizing that the humanitarian situation will continue to deteriorate in the absence of a political solution to the crisis, reiterating its endorsement of the Geneva Communiqué of 30 June 2012 (Annex II of Resolution 2118 (2113)) and demanding that all parties work towards the immediate and comprehensive implementation of the Geneva Communiqué aimed at bringing an immediate end to all violence, violations and abuses of human rights and violations of international law, and facilitating the Syrian-led political process launched in Montreux on 22 January 2014, leading to a transition that meets the legitimate aspirations of the Syrian people and enables them independently and democratically to determine their own future,<br><br>1.   Strongly condemns the widespread violations of human rights and international humanitarian law by the Syrian authorities, as well as the human rights abuses and violations of international humanitarian law by armed groups, including all forms of sexual and gender-based violence, as well as all grave violations and abuses committed against children in contravention of applicable international law, such as recruitment and use, killing and maiming, rape, attacks on schools and hospitals as well as arbitrary arrest, detention, torture, ill treatment and use as human shields, as described in the United Nations Secretary-General’s report on children and armed conflict in Syria (S/2014/31);<br><br>2.   Demands that all parties immediately put an end to all forms of violence, irrespective of where it comes from, cease and desist from all violations of international humanitarian law and violations and abuses of human rights, and reaffirm their obligations under international humanitarian law and international human rights law, and stresses that some of these violations may amount to war crimes and crimes against humanity;<br><br>3.   Demands that all parties immediately cease all attacks against civilians, as well as the indiscriminate employment of weapons in populated areas, including shelling and aerial bombardment, such as the use of barrel bombs, and methods of warfare which are of a nature to cause superfluous injury or unnecessary suffering, and recalls in this regard the obligation to respect and ensure respect for international humanitarian law in all circumstances, and further recalls, in particular, the obligation to distinguish between civilian populations and combatants, and the prohibition against indiscriminate attacks, and attacks against civilians and civilian objects as such;<br><br>4.   Demands that all parties, in particular the Syrian authorities, fully implement the provisions of the 2 October 2013 statement by the President of the Security Council (S/PRST/2013/15) including through facilitating the expansion of humanitarian relief operations, in accordance with applicable provisions of international humanitarian law and the UN guiding principles of humanitarian emergency assistance;<br><br>5.   Calls upon all parties to immediately lift the sieges of populated areas, including in the Old City of Homs (Homs), Nubl and Zahra (Aleppo), Madamiyet Elsham (Rural Damascus), Yarmouk (Damascus), Eastern Ghouta (Rural Damascus), Darayya (Rural Damascus) and other locations, and demands that all parties allow the delivery of humanitarian assistance, including medical assistance, cease depriving civilians of food and medicine indispensable to their survival, and enable the rapid, safe and unhindered evacuation of all civilians who wish to leave, and underscores the need for the parties to agree on humanitarian pauses, days of tranquillity, localised cease-fires and truces to allow humanitarian agencies safe and unhindered access to all affected areas in Syria, recalling that starvation of civilians as a method of combat is prohibited by international humanitarian law;<br><br>6.   Demands that all parties, in particular the Syrian authorities, promptly allow rapid, safe and unhindered humanitarian access for UN humanitarian agencies and their implementing partners, including across conflict lines and across borders, in order to ensure that humanitarian assistance reaches people in need through the most direct routes;<br><br>7.   Urges all parties, in particular the Syrian authorities, to take all appropriate steps to facilitate the efforts of the United Nations, its specialized agencies, and all humanitarian actors engaged in humanitarian relief activities, to provide immediate humanitarian assistance to the affected people in Syria, including by promptly facilitating safe and unhindered humanitarian access to populations in need of assistance in all areas under their control, and encourages further cooperation between the United Nations, its specialized agencies and all parties concerned, including Syrian civil society organisations, to facilitate access and the delivery of assistance in the entirety of the Syrian territory;<br><br>8.   Demands that all parties respect the principle of medical neutrality and facilitate free passage to all areas for medical personnel, equipment, transport and supplies, including surgical items, and recalls that under international humanitarian law, the wounded and sick must receive, to the fullest extent practicable, and with the least possible delay, medical care and attention required by their condition and that medical and humanitarian personnel, facilities and transport must be respected and protected, and expresses grave concern in this regard at the removal of medical supplies from humanitarian shipments;<br><br>9.   Also demands that all parties take all appropriate steps to protect civilians, including members of ethnic, religious and confessional communities, and stresses that, in this regard, the primary responsibility to protect its population lies with the Syrian authorities;<br><br>10.  Further demands that all parties demilitarize medical facilities, schools and other civilian facilities and avoid establishing military positions in populated areas and desist from attacks directed against civilian objects;<br><br>11.  Strongly condemns the arbitrary detention and torture of civilians in Syria, notably in prisons and detention facilities, as well as the kidnappings, abductions and forced disappearances, and demands the immediate end of these practices and the release of all arbitrarily detained persons starting with women and children, as well as sick, wounded and elderly people and including UN personnel and journalists;<br><br>12.  Urges all parties to take all appropriate steps to ensure the safety and security of United Nations personnel, those of its specialized agencies, and all other personnel engaged in humanitarian relief activities, without prejudice to their freedom of movement and access, stresses that the primary responsibility in this regard lies with the Syrian authorities and further stresses the need not to impede these efforts;<br><br>13.  Stresses the need to end impunity for violations of international humanitarian law and violations and abuses of human rights, and reaffirms that those who have committed or are otherwise responsible for such violations and abuses in Syria must be brought to justice;<br><br>14.  Strongly condemns the increased terrorist attacks resulting in numerous casualties and destruction carried out by organisations and individuals associated with Al-Qaida, its affiliates and other terrorist groups, urges the opposition groups to maintain their rejection of these organizations and individuals which are responsible for serious violations of international humanitarian law in opposition-held areas, calls upon the Syrian authorities and opposition groups to commit to combating and defeating organizations and individuals associated with Al-Qaida, its affiliates and other terrorist groups, demands that all foreign fighters immediately withdraw from Syria, and reaffirms that terrorism in all its forms and manifestations constitutes one of the most serious threats to international peace and security, and that any acts of terrorism are criminal and unjustifiable, regardless of their motivation, wherever, whenever and by whomsoever committed;<br><br>15.  Emphasizes that the humanitarian situation will continue to deteriorate in the absence of a political solution, welcomes in this regard the Geneva Conference on Syria launched in Montreux on 22 January 2014, and demands that all parties work towards the comprehensive implementation of the Geneva Communiqué of 30 June 2012 leading to a genuine political transition that meets the legitimate aspirations of the Syrian people and enables them independently and democratically to determine their own future, and further stresses that rapid progress on a political solution should include full participation by all groups and segments of Syrian society, including women, and represents the only sustainable opportunity to resolve the situation in Syria peacefully, and that the implementation of this resolution is key to meeting the humanitarian needs of the Syrian people;<br><br>16.  Urges all Member States to contribute or increase their support to the United Nations’ humanitarian appeals to meet the spiralling needs of people affected by the crisis, and to provide this support in coordination with the relevant United Nations agencies, and to ensure that all pledges are honoured in full, and further urges all Member States, based on burden sharing principles, to support the neighbouring host countries to enable them to respond to the growing humanitarian needs, including by providing direct support;<br><br>17.  Requests the Secretary-General to report to the Council on the implementation of this resolution by all parties in Syria, in particular paragraphs 2 through 12, in 30 days of its adoption and every 30 days thereafter, and upon receipt of the Secretary-General’s report, expresses its intent to take further steps in the case of non-compliance with this resolution;<br><br>18.  Decides to remain actively seized of the matter.'
        })
    })
];

// Helper functions

var helpers = {};

helpers.createUser = function (options) {
    options.id = users.length;
    var user = new User(options);
    users.push(user);
    return user;
};

helpers.createResolution = function (options) {
    return new Resolution(options);
};

helpers.createSimulation = function (options) {
    options.id = simulations.length;
    var simulation = new Simulation(options);
    simulations.push(simulation);
    return simulation;
};

// The database

module.exports = {
    countries: Country.names,
    simulations: simulations,
    users: users,
    helpers: helpers
};

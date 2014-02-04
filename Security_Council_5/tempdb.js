var resolutions = exports.resolutions = [];
/*
 * resolution object should include clause. a clause can have a subclause which is operative
 * 
 * */

var clauses = exports.clauses = [];
var subclauses = exports.subclauses = [];
var ammendments = exports.ammendments = [];
var entries = exports.entries = [];
var entriesSubClause = exports.entriesSubClause = [];
var users = exports.users = [];


//resolution information
var resolution = {};
resolution.Id = 1;
resolution.Content = 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...';
resolution.Title = 'What is Lorem Ipsum';
resolution.roomId = 0;
resolutions.push(resolution);

//fill users array
var user = {};
	user.Id = 1;
	user.Country = 'Australia';
	user.Name = 'Ryan Brushett';
	user.UserName = 'ryanb';
	user.Password = 'password';
	user.Position = 'ambassador';
	users.push(user);

	var user = {};
	user.Id = 2;
	user.Country = 'Australia';
	user.Name = 'Daniel';
	user.UserName = 'Daniel';
	user.Password = 'pass';
	user.Position = 'administrator';
	users.push(user);
		
	var user = {};
	user.Id = 3;
	user.Country = 'Nigeria';
	user.Name = 'Bukunola';
	user.UserName = 'Bukunola';
	user.Password = 'password';
	user.Position = 'member';
	users.push(user);
	
	var user = {};
	user.Id = 4;
	user.Country = 'France';
	user.Name = 'Uchenna';
	user.UserName = 'Uchenna';
	user.Password = 'password';
	user.Position = 'member';
	users.push(user);
	
	var user = {};
	user.Id = 5;
	user.Country = 'luxembourg';
	user.Name = 'Ryan';
	user.UserName = 'Ryan';
	user.Password = 'password';
	user.Position = 'member';
	users.push(user);
	
	var user = {};
	user.Id = 5;
	user.Country = 'luxembourg';
	user.Name = 'Whymarrh';
	user.UserName = 'Whymarrh';
	user.Password = 'password';
	user.Position = 'ambassador';
	users.push(user);
//end users	

	//clauses
for (var i=1; i<=4; i++){
	var clause = {};
	clause.Id = i;
	clause.resolutionId = 1;
	clause.Content = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'+
		'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown'+ 
		'printer took a galley of type and scrambled it to make a type specimen book.';
	clauses.push(clause);
}

//subclauses
for (var i=1; i<=2; i++){
	var subclause = {};
	subclause.Id = i;
	subclause.ClauseId = 3;
	subclause.Content = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'+
		'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown'+ 
		'printer took a galley of type and scrambled it to make a type specimen book.';
	subclauses.push(subclause);
}

//entries
for (var i=1; i<=4; i++){
	var entry = {};
	entry.Id = i;
	entry.ClauseId = 1;
	entry.Team = 'Chad';
	entry.Content = 'This is a new entry.';
	entry.Stand = 'against';
	entries.push(entry);
}

//entries
for (var i=1; i<=4; i++){
	var entry = {};
	entry.Id = i;
	entry.ClauseId = 2;
	entry.Team = 'Chad';
	entry.Content = 'This is a new entry for a sub clause.';
	entry.Stand = 'for'; 
	entriesSubClause.push(entry);
}

// Members array for random team assignment
var members = exports.members = ["Argentina","Australia",
                                 "Chad","Chile",
                                 "Jordan","Lithuania",
                                 "Luxembourg","Nigeria",
                                 "Republic of Korea","Rwanda",
                                 "China", "France", "Russia",
                                 "United States of America",
                                 "United Kingdom"
                                ];
// Empty rooms array for creating rooms
var rooms = exports.rooms = [];
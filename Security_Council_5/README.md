# COUNCIL

An app developed for COMP4770 in Winter 2013/2014 by Group 5

## Group 5 is...
	- Whymarrh Whitby
	- Ryan Murphy
	- Bukunola Ladele
	- Uchenna Edozien
	- Daniel Cook
	- Ryan Brushett

## Contents

This application installation contains:
	- app.js (the main file used to run the application)
	- tempdb.js (the temporary database info used in the application demo and testing)
	- package.json (the json file describing the app’s versioning and dependencies)
	- The node modules folder (the Node modules used in this project: currently Express and Hogan)
	- The public folder (a folder containing the public Javascript functions and CSS stylesheets used here)
	- The routes folder (includes the routes used by the app)
	- The templates folder (simply the XML templating for comment styles in the conversation channels of the app)
	- The views folder (the folder containing the .hjs views of the app)
	- The documentation folder (the folder containing iteration implementation plans, domain models, and use cases)
	- This README file.

## Installing and running the app

To run this app there are two possible methods.

### Without the Node.JS Eclipse Plugin

Change into the `/path/to_/SC_Sim_5/Security_Council_5` directory from a shell and execute

        $ node app.js

The app will confirm it has started by writing a message to the shell stating
        
        Express server listening on port 3000

Then, using Chrome, connect to http://localhost:3000/

You'll be presented with a login page. You may log in with <username // password> ryanb // password

### With the Node.JS Eclipse Plugin

Simply open the project in Eclipse and run the app.js file.

Then, using Chrome, connect to http://localhost:3000/

You'll be presented with a login page. You may log in with <username // password> ryanb // password

### Testing the App

	- Click on the admin link to be brought to the admin portal.
		- From here you'll be presented with options such as a system overview / dashboard
		- You'll be able to manage users
		- You'll be able to create councils
		- You'll be able to manage resolutions
	- If you click on the Users button
		- You'll be presented with a room list. We have pre-configured Security Council 17.
		- You'll have a link to the admin portal
		- You'll also have a logout button.
		- Note that by clicking the Simulation name (Security Council 17) you'll be brought in to view more details about the room
			- From in here you can click to join the ongoing chat/discussion
				- In the discussion room you'll be presented with a default view of the resolution, divided into its clauses.
					- You can select to "Discuss clause" to bring up the discussion list on that clause and view what people have been saying. It is from here that you can add your own voice to the conversation!
					- You can click on "speakers list" to preview that as well.

# Council (Ver1.0)

## Overview

Council is an app  that facilitates critical debate between different stakeholders about different topics. It provides an effective digital simulation of United Nations Security Council meetings. Administrators create and maintain different Councils, while Participants engage in debate about different resolutions with different people in these Councils. 

## Process

To set the foundation for this application, we selected a feature-based approach for this iteration. This is because the basic use cases users of this software would take were highly coupled with the architecture necessary for these use cases to be executed, and as such it was inefficient for each individual team member to take on development of specific use cases.

We set out by focusing on the clients. Incorporating the answers we’ve received to our questions with user experience analysis and design thinking, we drafted a model design for the app’s core functionality: the virtual Council “rooms” themselves. The result of this process was the three-column view you see when you log in and select a room. This user Council Dashboard view selectively displays all relevant data to a member of the Security Council’s negotiating team. This design resulted in clean separations for our team: several members took on the task of developing the chat room itself while the rest developed the system that would manage these Councils for participants and administrators.

Thus, development began, in pursuit of having the following features fully implemented by the Ver1.0 release:
	- Administrators can view and manage ongoing Councils with different user participants
	- Administrators can create a new Council
	- Users can view ongoing Councils
	- Users can join a Council room
	- Users can review the speeches previously made at the Council
	- Users can speak to the Council room on the current Resolution
	- Users can create private conversations with specific other users

The Group 5 development team firmly believes that these features, combined with the user-centred design we developed, provide a powerful foundation for building a highly functional and sophisticated application simulating Security Council debate and negotiations — most importantly, an application that fully satisfies our clients. We are happy to report that each of these features is implemented, and we were able to implement additional functionality in addition. The specific use cases administrators and users can do in Version 1.0 are described fully in the file “documentation/Ver1.0/Use Cases.md”.

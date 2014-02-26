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

# (Ver2.0)

## Overview

While Version 1.0 was focused on a “proof of concept” for this app, Version 2.0 focused on shoring up our foundations: simplifying and restructuring the backend to facilitate a resilient software design moving forward. 

## Process

Group 5’s iteration 2 plan involves fortifying the foundation we’ve already built, fully implementing the proof-of-concept features we implemented in iteration 1, and preparing to build on top of this with administrator reporting and insights, more polished design, and more robust debate functionality in future versions.

It also involved development of the software requirements (1-9) set out by Dr. Anderson. See below. 

## Tasks

The group completed the following tasks for version 2.0:

#### BACKEND:
	- Implementing a design that would be database-friendly and refining the user/administrator/Council model with these APIs
	- Refining the simulation room model
	- Developing the nation teams model (enabling moderators to select ambassadors based on their own decision-making or participants’ elections)
	- Refining the resolution model with extended support for amendments
	- Refining the user experience: simplifying and building consistency across pages

#### FRONTEND:
The following requirements adapted from Dr. Anderson’s task descriptions

1. Moderator creates a Security Council Simulation Space (SCSS) - beginning of semester!
2. Simulation participants register for SCSS - couple of days!
3. Moderator designates a Security Council Chairman (the Chair)!
		- Could be a TA, moderator or one of the registered participants!
4. Once the registration deadline passes, participants are divided into teams - couple of days!
		- Participants can indicate their preference for the top three countries!
		- System generates the initial partitioning of participants and forwards it to the moderator.!
		- The moderator can override system's selection!
5. After approval by the moderator, participants are notified about their teams and comembers of their teams!
	- Each team selects an ambassador - day or two!
		- Could be appointed by the moderator!
		- Team members could elect the ambassador!
		- The position of ambassador could rotate among team members!
6. Moderator puts forward a draft resolution, which includes several sub articles - first or second week in the semester!
	Countries/teams prepare internally a position paper to be submitted to the Chair - week or two!
7. Moderator can provide a set of directives to some of the teams!
8. After the deadline passes, position papers are made available to all teams!
		- Moderator and Chair can view the position papers before the deadline!
9.  Teams debate internally and prepare amendments to some/all articles of the resolution - few weeks!

## How it works

When users first hit the page at http://sc-5.cs.mun.ca, they are presented with a login page. For the sake of testing, you can use the user ryanb. The admin user is fiech. All passwords are "password" (without quotes).

1. Creating a new Simulation:
    a. Log in with user fiech // password to test. At the dashboard, click Create New Council.
    b. You are presented with a form to name the simulation and add a resolution. Note that the resolution can absolutely be updated/edited later.
    c. When you are happy with the properties, click create new simulation. You'll be redireceted to the admin dashboard and be able to select the new simulation. Users can now register for the simulation.
    
2. Simulation participants register for SCSS:
    a. Log in as ryanb // password. At the dashboard, you'll notice there are two types of simulations: Those you are registered for and those you are not. Select the simulation you created above.
    b. You'll notice a Join This Simulation button in the nav bar. Click this at this time.
    c. You're registered! This allows you to participate in debate, queues you for team selection, and allows you to become a chair.

3. Moderator designates a chair:
    a. Log in as fiech // password. You'll be brought to your dashboard and see simulations again.
    b. The simulations will note whether or not a council chair has been selected. For our default test data, no chair has been selected.
    c. Click a council name to be brought to its properties page.
    d. You'll notice a section regarding selecting a chair. You are given a dropdown list of users registered in the SCSS.
    e. Select a chair and click Set Chairperson to update the chair for the room. This is reflected on the dashboard for all users.
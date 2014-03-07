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
	- package.json (the json file describing the app's versioning and dependencies)
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

Then, using Chrome, connect to http://localhost:3333/

You'll be presented with a login page. You may log in with <username // password> ryanb // password

### With the Node.JS Eclipse Plugin

Simply open the project in Eclipse and run the app.js file.

Then, using Chrome, connect to http://localhost:3333/

You'll be presented with a login page. You may log in with <username // password> ryanb // password

# (Ver3.0)

## Overview

After refining our application for version 2, we focused on completing the feature list as much as possible for version 3.

## Process

Group 5's plan for Iteration 3 revolves mostly around completion of the featureset and refinement of the views used. We started by focusing on the voting mechanic heavily and all of the offshoots of that feature e.g. allowing amendments to pass, votes to fail, etc.
By focusing hard on a feature that is functionally the backbone of the application (voting), we were able to really shape the application and bring it closer to its final state.

## Tasks

The group completed the following tasks for version 3.0:

#### BACKEND:
TODO: BULLET POINTS ABOUT THE BACKEND

#### FRONTEND:
The following requirements adapted from Dr. Anderson's task descriptions

TODO: Numbered list of features added.

## How it works

When users first hit the page at http://sc-5.cs.mun.ca, they are presented with a login page. For the sake of testing, you can use the user ryanb. The admin user is fiech. All passwords are "password" (without quotes).

TODO: Enumerate points here and add process for testing
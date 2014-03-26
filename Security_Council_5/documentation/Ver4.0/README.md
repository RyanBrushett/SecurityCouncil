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

This application installation is based on the Model-View-Controller application design pattern and contains:
    - A sqlite3 database.
    - An app.js file that is the 'brain' of the application.
    - A routes directory that contains all of the controllers for the application.
    - A models directory that contains all of the models for the application.
    - A views directory that contains all of the html / hjs pages for the application.
    - A public directory that is home to both the public javascript and CSS files, as well as the uploaded position papers.
    - This README.md file.
    - A config.js that allows one to switch to an in-memory database for debug / testing.

## Installing and running the app

To run this app there are two viable methods, however the application should be deployed on sc-5.cs.mun.ca

See below for testing/local installs.

### Without the Node.JS Eclipse Plugin

Change into the `/path/to_/SC_Sim_5/Security_Council_5` directory from a shell and execute

        $ npm install # won't do anything unless required
        $ nohup node app.js &

The app will confirm it has started by writing a message to the shell stating

        Express server listening on port 3000

You can log out of the shell at this point if you like.
Then, using Chrome, connect to http://localhost:3333/

You'll be presented with a login page.

To kill the application, you will have to use the following to get the pid of the node application and kill it using the kill command:

        $ ps -elf | grep node

### With the Node.JS Eclipse Plugin

After running npm install from the same directory as the package.json, simply open the project in Eclipse and run the app.js file.

Then, using Chrome, connect to http://localhost:3333/

You'll be presented with a login page. You may log in with <username // password> ryanb // password

You can stop the application within eclipse.

# (Ver4.0)

## Overview

This iteration will be our final one for this product and the state that it is presented will be the final state for the scope of this course.

Further maintenance may be done by members outside of the course for fun!

## Process

    TODO:

## Tasks

    TODO:

#### BACKEND:

    TODO:

#### FRONTEND:

    TODO:

## How it works

    TODO:

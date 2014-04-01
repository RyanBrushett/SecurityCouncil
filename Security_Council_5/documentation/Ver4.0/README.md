# SECURITY COUNCIL

An app developed for COMP4770 in Winter 2013/2014 by Group 5

## Group 5 is...

    - Whymarrh Whitby
    - Ryan Murphy
    - Bukunola Ladele
    - Uchenna Edozien
    - Daniel Cook
    - Ryan Brushett

## Contents

This project is based on the Model-View-Controller application design pattern and contains:
    - A sqlite3 database.
    - An app.js file that is the 'brain' of the application.
    - A routes directory that contains all of the controllers for the application.
    - A models directory that contains all of the models for the application.
    - A views directory that contains all of the html / hjs pages for the application.
    - A public directory that is home to both the public javascript and CSS files, as well as the uploaded position papers.
    - This README.md file.

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

We really wanted to focus hard on design for this iteration so our first few meetings to start this iteration were held in a conference room away from distractions.
This allowed us to focus in on the things that we needed to do the most and make some key decisions, notably the inclusion or otherwise of a database (which, as you know, we left out of our last iteration).
A major component of the final iteration is going to be design and usability but focusing on the user experience and an intuitive flow.

## Tasks

- Allow for *full* moderation/administration by a moderator.
- Implement a SQLite3 Database.
- Focus and refine the user experience and design of the product.
- Allow for viewing metrics by the moderator.

#### BACKEND:

- SQLite3 Database
    - Everything starts in memory.
    - Objects are mirrored onto the database by looking at the object and using its properties as "columns".
    - Whenever an operation occurs, the object is saved back to the database.
    - On load, it will pull the data from the database and load it in memory.
    - See db.js and wat.db.
- Expanded moderator functionality.
    - Creating new moderators.
    - Moderators are now their own Object type.
    - Default admin account.
    - Moderators can access debate and post events/communicate with users.
    - Tracked metrics, viewable by the moderator.

#### FRONTEND:

- Dramatically updated views and user experience.
- Added the ability to view metrics about the system.
    - Metrics can be displayed by team or by user, along with general system metrics.
- Streamlined communication channels which are more 'universal' (see instructions for expansion on use)

## How it works

See Testing.md
See TechnicalNotes.md
 
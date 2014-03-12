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

The group completed the following tasks for version 3.0, sorted by backend functions, followed by user-facing functions:

#### BACKEND:
    - SQLite3 Database.
    - Voting mechanic.
    - Motions to ammend/act/vote etc.
    - Ambassador and chair functions.
    - User/role level security on routes and procedures.
    - Communication channels in the proper sense.
    - Position paper uploads in .doc / .pdf / .docx and other formats, along with a plaintext option.

#### FRONTEND:
On top of those implemented in the previous iteration, the following requirements adapted from Dr. Anderson's task descriptions

1. Teams debate internally and prepare amendments to some/all articles of the resolution.
    - Teams can propose to delete an article.
    - Teams can propose new articles.
    - Negotiations with other teams are ongoing.
2. Teams submit amendments and other motions to the Chair.
3. The Chair brings the amendments to a vote.
    - Amendments are usually voted in order received, but the Chair may change the voting sequence.
    - For each vote there is a debate among Security Council members.
    - For each vote, team may elect to declare "not present" (affects the quorum rule).
    - The timing of the vote is decided by the Chair.
    - There might be several rounds of voting.
4. The Chair brings the final resolution to a vote.
    - The resolution is voted on.
    - Permanent members have veto power (if perm. member says 'nay', it's considered a vito).

## How it works

When users first hit the page at http://sc-5.cs.mun.ca, they are presented with a login page. For the sake of testing, you can use the user ryanb. The admin user is fiech. All passwords are "password" (without quotes).

1. Motions to the chair:
    - Log in as fiech // password. Click on Political Science 2200. Set Ryan B as the chairperson for this example.
    - Log out and log back in as ryanb // password. Click on Political Science 2200. Note that you are the chair.
    - Select "Chair" from the navigation section of the screen. You'll notice The Resolution is under debate but there are two motions.
    - Click debate on one of the two motions.
    - If you check the debate! screen in Political Science 2200, you'll notice an alert from the chair that indicates a new motion is under debate.
    - It also has the motion text. Coversation can begin about this motion from there.
2. If vote is selected by the chair:
    - From the chair screen as above, make sure a motion is selected for debate, and click on Vote.
    - Using the Fiech account, in Political Science 2200, select a team and assign an ambassador.
        - For this example, log in as fiech and select Argentina. Set ryanb as the ambassador for argentina.
    - Log in using ryanb and enter the debate for Political Science 2200. You'll notice the comment box has been replaced with a voting system
    - Vote yay, nay, or not present.
    - The conversation box is returned.
3. Ambassador putting forward a motion to the chair:
    - The ambassador can put forward a motion by entering the simulation and selecting their team, very similar to how they'd add a position paper.
    - Enter Political Science 2200 as ryanb, assuming he is the ambassador for Argentina as per the example above.
    - Select Argentina where ryanb is the ambassador.
    - Notice the motion text field at the bottom. The Ambassador is the only team member who can use this box.
    - Submitting a motion will have it appear on the motion list managed by the chair.
    - Since you are both the chair and ambassador for the sake of testing, head back to the chair menu and notice your motion has now appeared.
4. Some notes about motions:
    - Debate on motions & the resolution is mutually exclusive (only one motion or resolution can be debated at a time).
        - Choosing to debate a motion just serves to signal to users what is happening. It is up to them to actually debate the correct motion.
    - When the chair clicks debate on a motion, that motion is flagged for debate (and all others are tabled). A comment is inserted into the debate view indicating the change.
    - When the chair clicks vote, this disables commenting until the vote is complete
        - At this time, ambassadors can vote from the debate view.
        - Other users will have a notice that a particular motion is up for voting.
        - Only a motion or resolution that is currently under debate should be allowed for voting (ie, you can not debate one motion and vote another)
    - When the vote is complete, the results will be posted to the chair and the moderator.
    - A (passed) vote on the resolution signals the end of the simulation.
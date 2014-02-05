How To
======
To run this app there are two possible methods.

### Without the Node.JS Eclipse Plugin
Change into the _/path/to_/SC_Sim_5/Security_Council_5 directory from a shell and execute

        $ node app.js

The app will confirm it has started by writing a message to the shell stating
        
        Express server listening on port 3000

Then, using Chrome, connect to http://localhost:3000/

You'll be presented with a login page. You may log in with <username // password> ryanb // password

You can test things out from here:

* Click on the admin link to be brought to the admin portal.
    * From here you'll be presented with options such as a system overview / dashboard
    * You'll be able to manage users
    * You'll be able to create councils
    * You'll be able to manage resolutions
* If you click on the Users button
    * You'll be presented with a room list. We have pre-configured Security Council 17.
    * You'll have a link to the admin portal
    * You'll also have a logout button.
    * Note that by clicking the Simulation name (Security Council 17) you'll be brought in to view more details about the room
        * From in here you can click to join the ongoing chat/discussion
* In the discussion room you'll be presented with a default view of the resolution, divided into its clauses.
    * You can select to "Discuss clause" to bring up the discussion list on that clause and view what people have been saying. It is from here that you can add your own voice to the conversation!
    * You can click on "speakers list" to preview that as well.

### With the Node.JS Eclipse Plugin
Simply open the project in Eclipse and run the app.js file.

Then, using Chrome, connect to http://localhost:3000/

You'll be presented with a login page. You may log in with <username // password> ryanb // password

You can test things out from here:

* Click on the admin link to be brought to the admin portal.
    * From here you'll be presented with options such as a system overview / dashboard
    * You'll be able to manage users
    * You'll be able to create councils
    * You'll be able to manage resolutions
* If you click on the Users button
    * You'll be presented with a room list. We have pre-configured Security Council 17.
    * You'll have a link to the admin portal
    * You'll also have a logout button.
    * Note that by clicking the Simulation name (Security Council 17) you'll be brought in to view more details about the room
        * From in here you can click to join the ongoing chat/discussion
* In the discussion room you'll be presented with a default view of the resolution, divided into its clauses.
    * You can select to "Discuss clause" to bring up the discussion list on that clause and view what people have been saying. It is from here that you can add your own voice to the conversation!
    * You can click on "speakers list" to preview that as well.
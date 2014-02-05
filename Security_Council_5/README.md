# Security Council
==================

## Tue. Feb 4:
* Merged everything into release branch for final clean up.
* Added restrictons to every route aside from /login
* Added a logout
* Changed /index to a proper index.hjs and moved the login info to a login.hjs to meet convention.
* Fixed some whitespace issues.
    * The tab key should produce spaces
    * shiftwidth and tabstop should be 4 spaces (if applicable)
* Added session info using Express session. Essentially, the session is set to the user object from the DB. e.g. req.session.user.UserName
* Fixed a bug where admins cannot login. Logins by admins now redirect to /sc-admin
* Added documentation for Version 1.0 in documentation/Ver1.0. Current use cases are in this file.

## Fri. Jan 31:
* Daniel and Ryan have merged their repos and now the user management and council management work together.
* Ryan added Random team assignment, Daniel added manual override from the admin management page.
* Links and pages are cleaned up. Ryan added some brief info in the dashboard.
* Daniel added ability to change password.

## Thu. Jan 30:
* Added a route for /sim
    * /sim lists all current simulation rooms
    * Displays them with their sub properties. Their names are links that lead to /sim/:name
* Added a route for /sim/:name
    * This just displays the property of the room for now with a message that says "You've joined the room {{ roomname }}"
* Added links to / that lead to our other pages. Not sure if we need to style it or not? Ryan M didn't want to touch it so I figured I'd babysit it.
* Cleaned up the structure of the filesystem a little bit. It's a bit more organized.
* Need to check on the organization (or lack thereof) on the remote branch
* Need to meet w/ Daniel

## Wed. Jan 29:
* Added the /sc-admin/managesim page
* Added a form that allows creating a room (uses form submission, no AJAX)
* Pushes room to the in-memory "database"
* Creates a link to the room in the managesim page. 
    * This link leads to /sc-admin/managesim/:name
    * :name is the Name property of the room as defined at creation time.
* The workflow allows the use of the side-bar for navigation.

## Mon. Jan 27:
* Added AJAX file and functions to change Admin Dashboard UI using AJAX requests. Might be handy.
* Talked to Dan about this. Dan is starting User Management. Ryan will do the Room/Sim creation.
* Little "database" is functional as per commits earlier the weekend.

## Fri. Jan 24:
* Added feature branch for admin dashboard
* Added a db.js with arrays for users and rooms. Not sure we'll need it, at least not yet, but it won't kill us to have it there.
* I need to comment stuff pretty badly.
* Created the framework for using the page
* Doesn't do a lot at the moment but it's somewhere to start from.
* Tested out Hogan and it's compiling and all that.
* Best bet is to run node app.js and visit http://localhost:3000/sc-admin I have some info on that page.

# A few notes
=============

* All of the routes are being "required" in their own var. E.g.

        var routes = require('./routes');
        var admin = require('./routes/scadmin');
        var user = require('./routes/user');
  
    which is a little messy. I'm not sure if there's a way around this but I think there is.

* Hogan is sweet. In the scadmin.js file there's a good example of compiling a hogan template and then having Express render it. It goes along with the sc-admin.hjs view to demonstrate how to render it as html and all that. It's explained there.

* db.js contains a rooms and users array that will be usable in the same way as a proper DB (kind of) for the duration of the program. E.g. if you want to test creating users or rooms or whatever, you can just add them to those arrays. Accessing them is done through require and an example is in the scadmin.js route.
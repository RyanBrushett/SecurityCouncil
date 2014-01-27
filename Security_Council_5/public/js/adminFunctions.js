function configureRoom(){
    var rec = {
        name: 'ryan'
    }
    // The URL as defined in the app.js page.
    var r = "/sc-admin/createroom";
    var json = JSON.stringify(rec);
    ajax.ajax_req({
        method: "POST",
        url: r,
        mime: 'application/json',
        doc: json,
        // If we get a 200 response (e.g. The route in app.js works)
        ok: function(res){

            /**
              * We grab the "main" panel in the admin page and blank it out.
              * Recall the scadmin.js renders part of a page, right? Well
              * here's what we do with that. The "render" comes back in the
              * AJAX response and we toss that as the inner HTML to our
              * main panel.
              */
            var main = document.getElementById("adminmaindisplay");
            main.innerHTML = "";
            main.innerHTML = res.responseText;
        },
        // If the URL is invalid or the request fails (404, 500, etc.)
        error: function(res){
            window.alert("It failed");
        }
    });
}

// See above for comments on how this shit works.
function manageUsers(){
    var rec = {
        page: 'Manage Users'
    }
    var r = "/sc-admin/manageusers";
    var json = JSON.stringify(rec);
    ajax.ajax_req({
        method: "POST",
        url: r,
        mime: 'application/json',
        doc: json,
        ok: function(res){
            var main = document.getElementById("adminmaindisplay");
            main.innerHTML = "";
            main.innerHTML = res.responseText;
        },
        error: function(res){
            window.alert("It failed");
        }
    });
}

var users = require('../../tempdb').users;

function getUserInfo(user){
    var rec = {
        username: user
    };
    
    // The URL as defined in the app.js page.
    var r = "/sc-admin/manageusers/getuserinfo";
    var json = JSON.stringify(rec);
    ajax.ajax_req({
        method: "POST",
        url: r,
        mime: 'application/json',
        doc: json,
        // If we get a 200 response (e.g. The route in app.js works)
        ok: function(res){
            var main = document.getElementById(user);
            if(main.innerHTML == "")
                main.innerHTML = res.responseText;
            else
                main.innerHTML = "";
        },
        // If the URL is invalid or the request fails (404, 500, etc.)
        error: function(res){
            window.alert("It failed");
        }
    });    
}
function configureRoom(){
    var rec = {
        name: 'ryan'
    }
    var r = "/sc-admin/createroom";
    var json = JSON.stringify(rec);
    ajax.ajax_req({
        method: "POST",
        url: r,
        mime: 'application/json',
        doc: json,
        ok: function(req){
           var main = document.getElementById("adminmaindisplay");
           main.innerHTML = "";
           main.innerHTML = req.responseText;
        },
        error: function(res){
            window.alert("It failed");
        }
    });
}
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
        ok: function(req){
            var main = document.getElementById("adminmaindisplay");
            main.innerHTML = "";
            main.innerHTML = req.responseText;
        },
        error: function(res){
            window.alert("It failed");
        }
    });
}

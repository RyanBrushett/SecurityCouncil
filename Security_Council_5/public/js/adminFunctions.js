function configureRoom(){
    var rec = {
        name: 'ryan'
    }
    var r = "/sc-admin/switchui";
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
function option2(){
    console.log("Click!");
}

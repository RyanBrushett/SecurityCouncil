function deleteChannel(sid,uid,chid) {
    var req = {
        sid: sid,
        uid: uid,
        chid: chid
    };
    var json = JSON.stringify(req);
    
    r = '/debate/deletechannel';
    
    ajax.ajax_req({
        method: "POST",
        url: r,
        mime: 'application/json',
        doc: json,
        ok: function(req){
            var div = document.getElementById(chid);
            div.parentNode.removeChild(div);
        },
        error: function(req){
            alert('AJAX Failed');
        }
    });
}
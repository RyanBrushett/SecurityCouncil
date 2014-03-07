function debateMotion(sid, motionId){
    var req = {
        sid: sid,
        motionId: motionId
    };
    var json = JSON.stringify(req);
    
    r = '/participant/chair/debate/motion';
    
    ajax.ajax_req({
        method: "POST",
        url: r,
        mime: 'application/json',
        doc: json,
        ok: function(req){
            location.reload(); //we should probably use jquery to just refresh a div instead of the whole page
        },
        error: function(req){
            alert('AJAX Failed');
        }
    });
}

function debateResolution(sid){
    var req = {
        sid: sid
    };
    var json = JSON.stringify(req);
    
    r = '/participant/chair/debate/resolution';

    ajax.ajax_req({
        method: "POST",
        url: r,
        mime: 'application/json',
        doc: json,
        ok: function(req){
            location.reload(); //we should probably use jquery to just refresh a div instead of the whole page
        },
        error: function(req){
            alert('AJAX Failed');
        }
    });
}
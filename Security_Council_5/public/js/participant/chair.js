function debateMotion(sid, userId, motionId){
    var req = {
        sid: sid,
        userId: userId,
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

function debateResolution(sid, userId){
    var req = {
        sid: sid,
        userId: userId
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

function voteMotion(sid, userId, motionId){
    var req = {
            sid: sid,
            userId: userId,
            motionId: motionId
        };
    var json = JSON.stringify(req);
    
    r = '/participant/chair/vote/motion';
    
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

function voteResolution(sid, userId){
    var req = {
            sid: sid,
            userId: userId
        };
    var json = JSON.stringify(req);
    
    r = '/participant/chair/vote/resolution';
    
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

function deleteMotion(sid, userId, motionId){
    var req = {
            sid: sid,
            userId: userId,
            motionId: motionId
        };
    var json = JSON.stringify(req);
    r = '/participant/chair/delete/motion';
    ajax.ajax_req({
        method: "POST",
        url: r,
        mime: 'application/json',
        doc: json,
        ok: function(res){
            location.reload();
        },
        error: function(res){
            alert('AJAX Failed. Contact person who wrote this software if it keeps happening');
        }
    });
}
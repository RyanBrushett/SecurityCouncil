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
            location.reload(); //I'll stop doing this soon, I promise -- Dan
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
            location.reload(); //I'll stop doing this soon, I promise -- Dan
        },
        error: function(req){
            alert('AJAX Failed');
        }
    });       
}

function deleteMotion(sid, userId, motionId, resId){
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
            var div = document.getElementById(motionId);
            div.parentNode.removeChild(div);
            
            var resObj = JSON.parse(res.responseText);
            
            if(resObj.isLast) {
                var resDiv = document.getElementById('resolution-' + resId);
                resDiv.innerHTML = '<p class="gtg">Status: DEBATE</p> <button type="button" class="button" onclick="voteResolution(' + sid + ', ' + userId + ')">Vote</button>';
            
                var statusSpan = document.getElementById('status');
                statusSpan.innerHTML = '<a href="/debate/{{simulation.id}}"> Debating the resolution';
            }
        },
        error: function(res){
            alert('AJAX Failed. Contact person who wrote this software if it keeps happening');
        }
    });
}
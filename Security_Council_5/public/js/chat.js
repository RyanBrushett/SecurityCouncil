window.onload = init;

var countryList = ["united states of america", "france", "china", "russia", "united kingdom",
                   "argentina", "australia", "chad", "chile", "jordan", "lithuania", "luxembourg", "nigeria", "rwanda", "republic of korea"];
countryList.sort();

function init(){
	
	getResolution();
	getSpeakersList();
	getClauseList();
}

function getClause(num){
	var rec = {
	        id: num
	    };
    var json = JSON.stringify(rec);
    ajax.ajax_req({
        method: "POST",
        url: "/chatroom/clauseAndEntries",
        mime: 'application/json',
        doc: json,
        ok: function(res) {
        	var main = document.getElementById('discussion');
    		main.innerHTML = "";
            main.innerHTML = res.responseText;
    	},
    error: function(res){
    	alert(res);
    }
    });
}

function getSubClause(num){
	var rec = {
	        id: num
	    };
    var json = JSON.stringify(rec);
    ajax.ajax_req({
        method: "POST",
        url: "/chatroom/subclauseAndEntries",
        mime: 'application/json',
        doc: json,
        ok: function(res) {
        	var main = document.getElementById('discussion');
    		main.innerHTML = "";
            main.innerHTML = res.responseText;
    	},
    error: function(res){
    	alert("Error getting sub clause: " + res.statusText);
    }
    });
}

function submitEntry()
{
	var input = document.getElementById('newentry');
	var type = document.getElementById('typeofclause');
	var clauseId = document.getElementById('clauseId');
	var e = document.getElementById("stand");
	var stand = e.options[e.selectedIndex].value;
	var rec = {
	        entry: input.value,
	        typeofclause: type.value,
	        team: 'example',
	        clauseId : clauseId.value,
	        stand : stand
	    };
    var json = JSON.stringify(rec);
    ajax.ajax_req({
        method: "POST",
        url: "/chatroom/entry",
        mime: 'application/json',
        doc: json,
        ok: function(res) {
        	var main = document.getElementById('entries');
        	main.innerHTML = '<div id="sub_'+res.reponseText+'"><p>By: TeameName</p><p>'+input.value+'</p></div><br />' + main.innerHTML;
    	},
    error: function(res){
    	alert("Error submitting entry: " + res.statusText);
    }
    });
}

function getSpeakersList(){
	ajax.ajax_req({
        method: "GET",
        url: 'chatroom/speakersList',
        mime: 'application/json',
        //doc: json,
        ok: function(res) {
        	var users = JSON.parse(res.responseText);       	
        	var text = '';
        	countryList.forEach(function(country){
        		text += '<div class="'+country.toLowerCase().replace(/ /g,'')+'"><b>'+country+'</b><hr/><ul>';
        		users.forEach(function(user){
        			if (user.Country.toLowerCase() == country.toLowerCase()){
        				if (user.Position.toLowerCase() == 'ambassador'){
        					text += '<li id="user_'+user.Id+'"><b>' + user.Name+'</b></li>';
        				}
        				else {
        					text += '<li id="user_'+user.Id+'">' + user.Name+'</li>';
        				}
        			}
        		});
        		text += '</ul></div><br/>';
        	});
        	var speakersDiv = document.getElementById('speakers_list_content');
    		speakersDiv.innerHTML = text;
        	},
        error: function(res){
        	alert("Error retrieving speakers list: " + res.statusText);
        }
        });
}

function getResolution()
{
	ajax.ajax_req({
        method: "GET",
        url: 'chatroom/resolution',
        mime: 'text/html',
        //doc: json,
        ok: function(res) {
        		var main = document.getElementById('resolution_content');
        		main.innerHTML = "";
                main.innerHTML = res.responseText;
        	},
        error: function(res){
        	alert(res);
        }
        });
}
window.onload = init;

var countryList = ["united states of america", "france", "china", "russia", "united kingdom",
                   "argentina", "australia", "chad", "chile", "jordan", "lithuania", "luxembourg", "nigeria", "rwanda", "republic of korea"];
countryList.sort();

function init(){
	
	getResolution();
	getSpeakersList();
	 /*
	 ajax.ajax_req({
	        method: "GET",
	        url: 'controller/resolutionInfo',
	        mime: 'application/json',
	        //doc: json,
	        ok: function(res) {
	        		var resolution = document.getElementById('resolution');
	        		resolution.innerHTML = res.responseText;
	        	},
	        error: function(res){
	        	alert(res);
	        }
	        });*/
}


function getSpeakersList(){
	ajax.ajax_req({
        method: "GET",
        url: 'chatroom/speakersList',
        mime: 'application/json',
        //doc: json,
        ok: function(res) {
        	var users = JSON.parse(res.responseText);
        	console.log(users);
        	
        	var text = '';
        	countryList.forEach(function(country){
        		text += '<div class="'+country.toLowerCase().replace(/ /g,'')+'"><b>'+country+'</b><hr/><ul>';
        		users.forEach(function(user){
        			if (user.Country.toLowerCase() == country.toLowerCase()){
        				if (user.Position.toLowerCase() == 'ambassador'){
        					text += '<li id="'+user.Id+'"><b>' + user.Name+'</b></li>';
        				}
        				else {
        					text += '<li id="'+user.Id+'">' + user.Name+'</li>';
        				}
        			}
        		});
        		text += '</ul></div><br/>';
        	});
        	var speakersDiv = document.getElementById('speakers');
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
        		var main = document.getElementById('content_container');
        		main.innerHTML = "";
                main.innerHTML = res.responseText;
        	},
        error: function(res){
        	alert(res);
        }
        });
}
function toggleVisibilitySideContent(id) {
       /*var element = document.getElementById(id);
       if(element.style.display == 'inline')
          element.style.display = 'none';
       else
          element.style.display = 'inline';*/
       if (id == 'agenda_content'){
    	   var element = document.getElementById(id);
           if(element.style.display == 'none') {
        	   element.style.display = 'inline';
        	   RemoveClassAndDisplayForSideContent('agenda_link', 'resolution_content', 'speakers_list_content')
           }  
       }
       else if (id == 'resolution_content'){
    	   var element = document.getElementById(id);
           if(element.style.display == 'none') {
        	   element.style.display = 'inline';
        	   RemoveClassAndDisplayForSideContent('resolution_link','agenda_content', 'speakers_list_content');
           }
       }
       else if (id == 'speakers_list_content'){
    	   var element = document.getElementById(id);
           if(element.style.display == 'none') {
        	   element.style.display = 'inline';
        	   RemoveClassAndDisplayForSideContent('speakers_link', 'resolution_content','agenda_content');
           }
       }
}

function RemoveClassAndDisplayForSideContent(linkId, firstcontent, secondcontent)
{
	var nodes = document.getElementsByClassName('tabs__list__item');
	for (var i=0; i <nodes.length; i++){
		nodes[i].classList.remove('current');
	};
	document.getElementById(linkId).parentNode.classList.add('current');
	document.getElementById(firstcontent).style.display = "none";
	document.getElementById(secondcontent).style.display = "none";
}

function clausedialogbox() {
	e = document.getElementById("clausedialogbox");
	e.style.visibility = (e.style.visibility == "visible") ? "hidden" : "visible";
}

function popupdialog() {
	e = document.getElementById("popupdialog");
	e.style.display = (e.style.display == "block") ? "none" : "block";
}
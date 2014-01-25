function teamSelection(){
    var adminmain = document.getElementById("adminmaindisplay");
    adminmain.innerHTML=""
    + "<label>"
    + "<input type=\"radio\" name=\"optionsRadios\" id=\"optionsRadios1\" value=\"random\" checked>"
    + "Random Team selection"
    + "</label><br />"
    + "<label>"
    + "<input type=\"radio\" name=\"optionsRadios\" id=\"optionsRadios2\" value=\"assigned\">"
    + "Assign Teams Manually"
    + "</label><br />"
    + "<button onclick=\"\">Submit</button>"
    + "<h3>I Just put this here to show that it changes.</h3>"
    + "<p>We could do forms in here for like, adding users or checkboxes / buttons for sorting options.</p>"
    + "<p>I'm not sure, mechanically, how this would work but I think Ajax/Json to create the room object on the fly would work.</p>"
    + "<p>Then we could commit it at the end.</p>";
}
function option2(){
    var adminmain = document.getElementById("adminmaindisplay");
    adminmain.innerHTML="<h3>Option2</h3>";
}

function option1(){
    var adminmain = document.getElementById("adminmaindisplay");
    adminmain.innerHTML=""
    + "<form role=\"form\">"
    + "<div class=\"form-group\">"
    + "<label for=\"exampleInputEmail1\">Email address</label>"
    + "<input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" placeholder=\"Enter email\">"
    + "</div>"
    + "<div class=\"form-group\">"
    + "<label for=\"exampleInputPassword1\">Password</label>"
    + "<input type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\">"
    + "</div>"
    + "<button type=\"submit\" class=\"btn btn-default\">Submit</button>"
    + "</form>"
    + "<h3>I Just put this here to show that it changes.</h3>"
    + "<p>We could do forms in here for like, adding users or checkboxes / buttons for sorting options.</p>"
    + "<p>I'm not sure, mechanically, how this would work but I think Ajax/Json to create the room object on the fly would work.</p>"
    + "<p>Then we could commit it at the end.</p>";
}
function option2(){
    var adminmain = document.getElementById("adminmaindisplay");
    adminmain.innerHTML="<h3>Option2</h3>";
}

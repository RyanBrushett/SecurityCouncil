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
    + "</form>";
}
function option2(){
    var adminmain = document.getElementById("adminmaindisplay");
    adminmain.innerHTML="<h3>Option2</h3>";
}

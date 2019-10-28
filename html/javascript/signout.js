$(document).ready(function(){
  $("#signout").click(function(){
    // let cur_user_id=$.session.get("cur_user_id");
    alert("hey "+$.session.get("cur_username")+", you have successfully logged out!");
    $.session.clear();
    window.location.href = "home.html";
  })
})

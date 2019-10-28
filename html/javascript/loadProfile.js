$(document).ready(function() {

  let cur_user_id = $.session.get("cur_user_id");
  if (cur_user_id != null) {
    let cur_username = $.session.get("cur_username");
    let cur_fname = $.session.get("cur_fname");
    let cur_lname = $.session.get("cur_lname");
    let cur_email = $.session.get("cur_email");
    $("#fullName").html(cur_fname + " " + cur_lname);
    $("#username").html(cur_username);
  }
  else {
    alert("session not created, it seems you did not get logged in, try again!");
  }
})

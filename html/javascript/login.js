console.log("login");
$(document).ready(function() {
  $("#loginButton").click(function() {
    // alert("hi button ");
    $.ajax({
      url: '/user_login',
      async: true,
      dataType: 'json',
      type: 'POST',
      data: {
        email: $("#modalLRInput10").val(),
        password: $("#modalLRInput11").val()
      }
    }).done(function(msg) {
      console.log(msg);
      alert("hi " + msg.row.fname+ ", you have successfully logged in!");

      $.session.set("cur_user_id", msg.row.user_id);
      $.session.set("cur_username", msg.row.username);
      $.session.set("cur_fname", msg.row.fname);
      $.session.set("cur_lname", msg.row.lname);
      $.session.set("cur_email", msg.row.email);
      window.location.href = "profile.html";
    }).fail(function(xhr, status, error) {
      // alert("haaye");
      alert(status);
      console.log(xhr);
      console.log(error);
    })
  })
})

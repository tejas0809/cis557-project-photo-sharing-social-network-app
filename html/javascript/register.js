console.log("register");

 $(document).ready(function(){
   $("#signupBtn").click(function(){
     $.ajax({
       url:'/user_register',
       async: true,
       dataType: 'json',
       type: 'POST',
       data:{
         username:$("#modalLRInput15").val(),
         fname:$("#modalLRInput13").val(),
         lname:$("#modalLRInput14").val(),
         email:$("#modalLRInput12").val(),
         password:$("#modalLRInput16").val()
       }
     }).done(function(msg){
       alert("hi "+msg.user.fname+"you have successfully signed up!");
       // alert(msg.user);
       // alert(msg.id);

       $.session.set("cur_user_id",msg.id);
       $.session.set("cur_username",msg.user.username);
       $.session.set("cur_fname",msg.user.fname);
       $.session.set("cur_lname",msg.user.lname);
       $.session.set("cur_email",msg.user.email);
       // $.session.set("cur_password")
       // let temp=$.session.get("current_user_id");
       // alert("hihi "+temp);
       window.location.href = "profile.html";
       // console.log(data);
       // $("#tab1head").attr("class","nav-item active");
       // $("#tab1link").attr("aria-expanded",true);
       // $("#tab2head").attr("class","nav-item");
       // $("#tab2link").attr("aria-expanded",false);
       // $(#tab1head).trigger('click');
     }).fail(function(xhr,status,error){
       alert("haaye");
       alert(status);
       console.log(xhr);
       console.log(error);
     })
   })
})

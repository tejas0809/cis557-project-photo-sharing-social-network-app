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
       },
       success:function(msg,status,xhr){
         var usrData=msg;
         console.log(usrData);
       }
     }).done(function(msg){
       alert("hi"+msg.user.fname+"you have successfully signed up!");
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

function formValidation()
{
    var fname=document.getElementById("modalLRInput12");
    var lname=document.getElementById("modalLRInput13");
    var email=document.getElementById("modalLRInput14");
    var username=document.getElementById("modalLRInput15");
    var password=document.getElementById("modalLRInput16");

    if(fname_validation(fname) && lname_validation(lname) && userid_validation(username))
    {
        if(passid_validation(password,6))
        {
            if(ValidateEmail(uemail))
            {
            
            }                 
        }
    }

    return false;
    

} 
function userid_validation(uid)
{
    var uid_len = uid.value.length;
    if (uid_len == 0  )
    {
        alert("User Id should not be empty!");
        uid.focus();
        return false;
    }
    else if(allLetter(uid)==false)
    {
        alert("Only letters should be used!");
        uid.focus();
        return false;
    }
    return true;
}
function fname_validation(uid)
{
    var uid_len = uid.value.length;
    if (uid_len == 0  )
    {
        alert("First name should not be empty!");
        uid.focus();
        return false;
    }
    else if(allLetter(uid)==false)
    {
        alert("Only letters should be used!");
        uid.focus();
        return false;
    }
    return true;
}
function lname_validation(uid)
{
    var uid_len = uid.value.length;
    if (uid_len == 0  )
    {
        alert("Last name should not be empty!");
        uid.focus();
        return false;
    }
    else if(allLetter(uid)==false)
    {
        alert("Only letters should be used!");
        uid.focus();
        return false;
    }
    return true;
}
function passid_validation(passid,mx)
{
    var passid_len = passid.value.length;
    if (passid_len == 0 || passid_len < mx)
    {
        alert("Password should not be empty / length greater than "+mx);
        passid.focus();
        return false;
    }
    return true;
}

function allLetter(uname)
{ 
    var letters = /^[A-Za-z]+$/;
    if(uname.value.match(letters))
    {
        return true;
    }
    else
    {
        alert('Username must have alphabet characters only');
        uname.focus();
        return false;
    }
}
function alphanumeric(uadd)
{ 
    var letters = /^[0-9a-zA-Z]+$/;
    if(uadd.value.match(letters))
    {
        return true;
    }
    else
    {
        alert('User address must have alphanumeric characters only');
        uadd.focus();
        return false;
    }
}

function allnumeric(uzip)
{ 
    var numbers = /^[0-9]+$/;
    if(uzip.value.match(numbers))
    {
        return true;
    }
    else
    {
        alert('ZIP code must have numeric characters only');
        uzip.focus();
        return false;
    }
}
function ValidateEmail(uemail)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(uemail.value.match(mailformat))
    {
        return true;
    }
    else
    {
        alert("You have entered an invalid email address!");
        uemail.focus();
        return false;
    }
}


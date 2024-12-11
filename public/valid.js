function Validate() 
{
    var Password = document.getElementById("Password");
    var length = document.getElementById("Length");
    var Username = document.getElementById("Username");

    if(Password.value.match(/^[A-Za-z]\w{7,14}$/) && (Username.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) 
        {
            alert("Login Successful");
            LoginSuccessful();
            return false;
        }
    else
    {
        alert("Login Failed. \nUsername must be a valid email. \nPassword must be between 7 to 16 characters. First character must be a letter and it can only contain alphabets, numbers, and underscores.");
        e.preventDefault();
    }
}

function SanitizeInput(event) 
{
    const regex = /[^a-zA-Z0-9_@. ]/g;
    const currentValue = event.target.value;

    if (regex.test(currentValue)) 
        {
            event.target.value = currentValue.replace(regex, "");
        }

}

function RegistrationValidate() 
{
    var Password = document.getElementById("Password");
    var length = document.getElementById("Length");
    var Username = document.getElementById("Username");
    var PhoneNumber = document.getElementById("Phone Number");

    if(Password.value.match(/^[A-Za-z]\w{7,14}$/) && (Username.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) && (PhoneNumber.value.match(/^\d{10}$/))) 
        {
            alert("Registration Successful");
            BackToLogin();
            return false;
        }
    else
    {
        alert("Registration Failed. \nPhone Number must be entered in 10 digit format. \nUsername must be a valid email. \nPassword must be between 7 to 16 characters, First character must be a letter and it can only contain alphabets, numbers, and underscores.");
        e.preventDefault();
    }
}

function LoginSuccessful() 
{
    window.location.replace("index.html");
    document.cookie = "username=JohnDoe; max-age=10; path=/; SameSite=Strict; Secure;";
}

function BackToLogin() 
{
    window.location.replace("LoginForm.html");
    document.cookie = "username=; max-age=0; path=/; SameSite=Strict; Secure;";
}

function BackToRegistration() 
{
    window.location.replace("Registration.html");
}

function CheckSession() 
{
    const cookies = document.cookie.split(";");
    let sessionActive = false;

    for (let i = 0; i < cookies.length; i++) 
        {
            if (cookies[i].trim().startsWith("username=")) 
                {
                    sessionActive = true;
                    break;
                }
        }

    if (sessionActive) 
        {
            alert("Session is active!");
        } 
    else 
        {
            window.location.replace("LoginForm.html");
            alert("Session Expired!");
        }
}

function EndSession() 
{
    window.location.replace("LoginForm.html");
    document.cookie = "username=; max-age=0; path=/; SameSite=Strict; Secure;";
    alert("Session Ended!");
}

let timeout;
const timeoutDuration = 60 * 1000;

function StartInactivityTimer() 
{
    clearTimeout(timeout);

    timeout = setTimeout(() => 
        {
            alert("You have been logged out due to inactivity.");
            BackToLogin(); 
            window.location.href("/LoginForm.html")
        },  timeoutDuration);
}

function MonitorActivity() {
    window.addEventListener("mousemove", StartInactivityTimer);
    window.addEventListener("keydown", StartInactivityTimer);
    window.addEventListener("click", StartInactivityTimer);
}
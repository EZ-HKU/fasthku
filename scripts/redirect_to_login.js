

try {
    // check if user is logged in
    if (document.getElementsByClassName("lambda-login-button")[0]//.getElementsByTagName("a")[0].innerHTML == "Log in"
        ) 
        {
        // user is not logged in
        // redirect to login page "https://moodle.hku.hk/login/index.php"
        document.location.href = "https://moodle.hku.hk/login/index.php";
}
} catch (error) {
    // user is logged in
    // do nothing
    console.log("User is already logged in");
}



try {
    // check if user is logged in
    if (document.getElementsByClassName("pull-right")[0].getElementsByTagName("a")[0].innerHTML == "login") {
        // user is not logged in
        // redirect to login page "https://moodle.hku.hk/login/index.php"
        document.location.href = "https://moodle.hku.hk/login/index.php";
}
} catch (error) {
    // user is logged in
    // do nothing
}

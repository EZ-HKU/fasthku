window.fastHKUshowLoading();

function setTimeStamp() {
    time_object = new Date();
    time = "" + time_object.getFullYear() + time_object.getMonth() +
        time_object.getDate() + time_object.getHours() + time_object.getMinutes() +
        time_object.getSeconds();
    var keyid = document.getElementsByName("keyid")[0];
    if (keyid) {
        keyid.value = time;
    }
}

window.fastHKUTryLogin(function (data) {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    if (username && password) {
        setTimeStamp();
        username.value = data.username;
        password.value = data.password;
        var login_btn = document.getElementById("login_btn");
        if (login_btn) {
            login_btn.click();
        }
    }
});
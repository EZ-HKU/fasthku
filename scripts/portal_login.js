function setTimeStamp() {
    time_object = new Date();
    time = "" + time_object.getFullYear() + time_object.getMonth() +
        time_object.getDate() + time_object.getHours() + time_object.getMinutes() +
        time_object.getSeconds();
    document.getElementsByName("keyid")[0].value = time;
}

chrome.storage.sync.get(['username', 'password'], function (data) {
    setTimeStamp();
    document.getElementById("username").value = data.username;
    document.getElementById("password").value = data.password;
    document.getElementById("login_btn").click();
});

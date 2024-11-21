window.fastHKUshowLoading();

window.fastHKUTryLogin(function (data) {
    var userNameInput = document.getElementById("userNameInput")
    var passwordInput = document.getElementById("passwordInput")
    if (userNameInput && passwordInput) {
        userNameInput.value = data.username + "@connect.hku.hk";
        passwordInput.value = data.password;
        document.getElementById("submitButton").click();
    }
});
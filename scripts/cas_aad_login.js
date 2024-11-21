window.fastHKUTryLogin(function (data) {
    let email = data.username + "@connect.hku.hk";
    let emailInput = document.getElementById("email");
    if (emailInput) {
        emailInput.value = email;
        document.getElementById("login_btn").click();
    }
});
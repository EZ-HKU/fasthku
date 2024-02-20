
chrome.storage.sync.get(['username'], function (data) {
    let email = data.username + "@connect.hku.hk";
    document.getElementById("email").value = email;
    document.getElementById("login_btn").click();
});

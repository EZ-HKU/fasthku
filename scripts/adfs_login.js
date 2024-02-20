chrome.storage.sync.get(['username', 'password'], function (data) {
    document.getElementById("userNameInput").value = data.username + "@connect.hku.hk";
    document.getElementById("passwordInput").value = data.password;
    document.getElementById("submitButton").click();
});
chrome.storage.sync.get(['username', 'password'], function (data) {
    document.getElementsByName("userid")[0].value = data.username;
    document.getElementsByName("password")[0].value = data.password;
    document.getElementsByName("submit")[0].click();
});

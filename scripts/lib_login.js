chrome.storage.sync.get(["username", "password"], function (data) {
  if ("login_params" in window) {
    document.getElementsByName("userid")[0].value = data.username;
    document.getElementsByName("password")[0].value = data.password;

    document.getElementsByName("submit")[0].click();
  }
});

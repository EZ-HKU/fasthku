window.fastHKUTryLogin(function (data) {
  var userid = document.getElementsByName("userid")[0];
  var password = document.getElementsByName("password")[0];

  if (userid && password) {
    userid.value = data.username;
    password.value = data.password;

    let script = document.createElement('script');
    script.src = chrome.runtime.getURL('scripts/lib_login.js');
    script.onload = function () {
        // this.remove();
    }
    document.body.appendChild(script);
  }
});
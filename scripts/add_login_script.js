chrome.storage.sync.get(["username", "password"], function (data) { 
  
    document.getElementsByName("userid")[0].value = data.username;
    document.getElementsByName("password")[0].value = data.password;

  });
  
let script = document.createElement('script');
script.src = chrome.runtime.getURL('scripts/lib_login.js');
script.onload = function () {
    // this.remove();
}
document.body.appendChild(script);

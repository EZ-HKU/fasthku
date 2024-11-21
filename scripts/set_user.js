var save = document.getElementById("save");
var inputField = document.getElementById("password");

var setUserData = function () {
  // get data list from storage

  // get data from input
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var data = {
    username: username,
    password: password,
  };

  chrome.storage.sync.get(["list"], function (items) {
    var data_list = items.list;
    if (data_list === undefined) {
      data_list = [];
    }
    // check if data is in list
    for (var i = 0; i < data_list.length; i++) {
      if (data_list[i].username === username) {
        data_list.splice(i, 1);
        break;
      }
    }
    // add data to list
    data_list.push(data);
    // save list to storage
    chrome.storage.sync.set({ list: data_list }, function () {});

    if (data_list.length === 1) {
      // save data to storage
      chrome.storage.sync.set({
        username: username,
        password: password,
      });
    }

    // show notification
    // clear body
    document.body.innerHTML = "";
    var div = document.createElement("h1");
    div.innerHTML = "Saved user " + username + ".";
    document.body.appendChild(div);
  });

  // close
  setTimeout(function () {
    window.close();
  }, 1000);
};

save.addEventListener("click", setUserData);

inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    setUserData();
  }
});

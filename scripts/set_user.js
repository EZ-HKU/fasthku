var save = document.getElementById('save');
save.addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var data = {
        username: username,
        password: password
    };
    chrome.storage.sync.set(data, function() {
        console.log('Data is saved');
    });
    // show notification
    // clear body
    document.body.innerHTML = '';
    var div = document.createElement('h1');
    div.innerHTML = 'Data is saved';
    document.body.appendChild(div);
    // close
    setTimeout(function() {
        window.close();
    }, 1000);
});
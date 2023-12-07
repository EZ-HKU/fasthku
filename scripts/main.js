
// get data list from storage
let data_list = [];

chrome.storage.sync.get(['list', 'username', 'password'], function (items) {
    if (items.list !== undefined) {
        data_list = items.list;
    } else {
        if (items.username === undefined) {
            // go to options.html
            location.href = chrome.runtime.getURL('popup/options.html');
        } else {
            data_list = [{
                username: items.username,
                password: items.password
            }]
        }
    }
    
    let list = document.getElementById('linkList');
    
    
    for (let i = 0; i < data_list.length; i++) {
        let div = document.createElement('div');
        div.classList.add('linkWithImage');
        let img = document.createElement('img');
        img.src = 'https://sis-eportal.hku.hk/favicon.ico';
        img.alt = data_list[i].username;
        img.width = 20;
        img.height = 20;
        img.style.marginRight = '10px';
        div.appendChild(img);
        let text = document.createTextNode(data_list[i].username);
        div.appendChild(text);
        list.appendChild(div);
    }
    
    let linkWithImage = document.getElementsByClassName('linkWithImage');
    for (let i = 0; i < linkWithImage.length; i++) {
        linkWithImage[i].addEventListener('click', function () {
            // save data to storage
            chrome.storage.sync.set({
                username: data_list[i].username,
                password: data_list[i].password
            });

            // show notification
            // clear body
            document.body.innerHTML = '';
            let div = document.createElement('h1');
            div.innerHTML = 'Switch user to ' + data_list[i].username + '.';
            document.body.appendChild(div);

            // close
            setTimeout(function () {
                window.close();
            }, 1000);
        });
    }
});

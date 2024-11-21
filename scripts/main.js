
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
    console.log(items);
    for (let i = 0; i < data_list.length; i++) {
        let div = document.createElement('div');
        div.classList.add('linkWithImage');
        let text = document.createTextNode('😄 '+data_list[i].username);
        if (data_list[i].username === items.username) {
            div.classList.add('active');
            text = document.createTextNode('😀 '+data_list[i].username);
            div.addEventListener('mouseover', function () {
                text.nodeValue = '😵 '+data_list[i].username;
            });
            div.addEventListener('mouseout', function () {
                text.nodeValue = '😀 '+data_list[i].username;
            });
        }
        div.appendChild(text);        
        list.appendChild(div);
    }

    
    let linkWithImage = document.getElementsByClassName('linkWithImage');
    let data_list_copy = data_list.slice();
    for (let i = 0; i < linkWithImage.length; i++) {
        if (data_list[i].username === items.username) {
            linkWithImage[i].addEventListener('click', function () {
                data_list.splice(i, 1);
                chrome.storage.sync.set({
                    list: data_list
                });
                location.reload();
            });
            continue;
        }
        linkWithImage[i].addEventListener('click', function () {
            console.log(data_list_copy)
            // save data to storage
            chrome.storage.sync.set({
                username: data_list_copy[i].username,
                password: data_list_copy[i].password
            });

            // reload page
            location.reload();
        });
    }

});

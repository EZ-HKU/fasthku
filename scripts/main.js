

let list = document.getElementById('linkList');

let links = [
    {
        name: 'HKU Portal',
        url: 'https://hkuportal.hku.hk/login.html',
    },
    {
        name: 'HKU Moodle (Dashboard)',
        url: 'https://moodle.hku.hk/my/',
    },
    {
        name: 'HKU Library Booking System',
        url: 'https://lib.hku.hk/hkulauth/legacy/authMain?uri=https://booking.lib.hku.hk/getpatron.aspx',
    },
    {
        name: 'HKU Exam Base',
        url: 'https://exambase-lib-hku-hk.eproxy.lib.hku.hk/exhibits/show/exam/home',
    }
];

for (let i = 0; i < links.length; i++) {
    let div = document.createElement('div');
    div.classList.add('linkWithImage');
    let img = document.createElement('img');
    img.src = 'https://sis-eportal.hku.hk/favicon.ico';
    img.alt = links[i].name;
    img.width = 20;
    img.height = 20;
    img.style.marginRight = '10px';
    div.appendChild(img);
    let text = document.createTextNode(links[i].name);
    div.appendChild(text);
    list.appendChild(div);
}

let linkWithImage = document.getElementsByClassName('linkWithImage');
for (let i = 0; i < linkWithImage.length; i++) {
    linkWithImage[i].addEventListener('click', function () {
        chrome.tabs.create({ url: links[i].url });
    });
}
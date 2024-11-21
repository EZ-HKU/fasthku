function createLoadingOverlay() {
    // 创建覆盖层
    const overlay = document.createElement('div');
    overlay.className = 'fastHKU-loading-overlay';
    
    // 创建加载容器
    const container = document.createElement('div');
    container.className = 'fastHKU-loading-container';
    
    // 创建文本
    const text1 = document.createElement('div');
    text1.textContent = 'FastHKU';
    text1.className = 'fastHKU-title';

    const text2 = document.createElement('div');
    text2.textContent = 'Please waiting...';
    text2.className = 'fastHKU-message';
    
    // 创建加载动画
    const spinner = document.createElement('div');
    spinner.className = 'fastHKU-spinner';
    
    // 组装元素
    container.appendChild(text1);
    container.appendChild(text2);
    container.appendChild(spinner);
    overlay.appendChild(container);
    
    return overlay;
}

function showLoading() {
    const overlay = createLoadingOverlay();
    document.body.appendChild(overlay);
    console.log('Loading overlay created');
    return overlay;
}

function hideLoading() {
    var overlay = document.querySelector('.fastHKU-loading-overlay');
    if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
    }
}

function changeToNotification(message) {
    var overlay = document.querySelector('.fastHKU-loading-overlay');
    if (overlay) {
        overlay.querySelector('.fastHKU-loading-container').removeChild(overlay.querySelector('.fastHKU-spinner'));
        overlay.querySelector('.fastHKU-message').textContent = message;
    }
}

window.fastHKUTryGetUser = new Promise((resolve, reject) => {
    chrome.storage.sync.get(['username', 'password'], function (items) {
        if (items.username && items.password) {
            resolve({
                username: items.username,
                password: items.password
            });
        }
        reject('No user found');
    });
});

window.fastHKUTryLogin = function (loginFunc) {
    chrome.runtime.sendMessage({
        type: 'CHECK_LOGIN_STATE'
    }).then(response => {
        if (!response.canTryLogin) {
            const remainingSeconds = Math.ceil(response.remainingCooldown / 1000);
            changeToNotification(`Login failed! Please check your account and try to login after ${remainingSeconds} seconds.`);
            console.log(error);
            setTimeout(() => {
                hideLoading();
            }, 3000);
            return;
        }
        window.fastHKUTryGetUser.then((data) => {
            chrome.runtime.sendMessage({
                type: 'LOGIN_FAILED'
            }).then(() => {
                console.log('Try login with user:', data);
            });
            loginFunc(data);
        }).catch((error) => {
            changeToNotification('No user found. Please add user first.');
            console.log(error);
            setTimeout(() => {
                hideLoading();
            }, 2000);
        });
    });
}

showLoading();


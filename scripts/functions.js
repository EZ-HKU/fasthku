
const addInnerElements = window.ezReact.addInnerElements;
const addStyles = window.ezReact.addStyles;
const addCustom = window.ezReact.addCustom;
const createElement = window.ezReact.createElement;
const Text = window.ezReact.Text;

function Overlay(inner, custom) {
    return createElement(inner, custom, () => {
        // create overlay
        let overlay = document.createElement('div');
        overlay.className = 'fastHKU-loading-overlay';

        // style overlay
        overlay = addStyles(overlay, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '9999'
        });

        return overlay;
    });
}

function Container(inner, custom) {
    return createElement(inner, custom, () => {
        // create container
        let container = document.createElement('div');
        container.className = 'fastHKU-loading-container';

        // style container
        container = addStyles(container, {
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
        });

        return container;
    });
}

function Spinner(inner, custom) {
    return createElement(inner, custom, () => {
        // create spinner
        let spinner = document.createElement('div');
        spinner.className = 'fastHKU-spinner';

        // style spinner
        spinner = addStyles(spinner, {
            width: '40px',
            height: '40px',
            margin: '10px auto',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        });
        // animation "spin" should be defined in CSS !!!

        return spinner;
    });
}

function LoadingOverlay(inner, custom) {
    // create overlay
    return (
        Overlay([
            Container([
                Text('FastHKU', {
                    className: 'fastHKU-title',
                }),
                Text('Please waiting...', {
                    className: 'fastHKU-message',
                }),
                Spinner()
            ], null)
        ], null)
    );
}

function createLoadingOverlay() {
    return LoadingOverlay(null, null);
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

window.fastHKUshowLoading = showLoading;


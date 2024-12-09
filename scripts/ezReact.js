window.ezReact = {};

window.ezReact.addInnerElements = function(parent, inner) {
    for (let i = 0; i < inner.length; i++) {
        parent.appendChild(inner[i]);
    }
    return parent;
}

window.ezReact.addStyles = function(element, styles) {
    for (let key in styles) {
        element.style[key] = styles[key];
    }
    return element;
}

window.ezReact.addCustom = function(element, custom) {
    for (let key in custom) {
        if (key === 'style') {
            element = addStyles(element, custom[key]);
            continue;
        }
        element[key] = custom[key];
    }
    return element;
}

window.ezReact.createElement = function(inner, custom, func) {
    let element = func();

    if (custom) {
        element = addCustom(element, custom);
    }

    if (inner) {
        element = addInnerElements(element, inner);
    }

    return element; 
}

window.ezReact.Text = function(text, custom) {
    return createElement(null, custom, () => {
        // create text element
        let textElement = document.createElement('div');
        textElement.textContent = text;
        return textElement;
    });
}
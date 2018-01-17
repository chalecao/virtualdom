/* fed123.com */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var vdom = vnode(
    "div",
    { id: "_Q5", style: "border: 1px solid red;" },
    vnode(
        "div",
        { style: "text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;" },
        vnode("img", { src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png", height: "56", style: "border: none; margin: 8px 0px;" }),
        vnode(
            "span",
            null,
            "hello"
        ),
        "google"
    )
);

var vdom1 = vnode(
    "div",
    { id: "_Q5", style: "background: red;" },
    vnode(
        "div",
        { style: "text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;" },
        vnode("img", { src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png", height: "56", style: "border: 1px solid red; margin: 8px 0px;" }),
        vnode(
            "span",
            null,
            "world"
        ),
        "chrome"
    )
);

function vnode(type, props) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    return { type: type, props: props, children: children };
}

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    var $el = document.createElement(node.type);
    // set props
    setProps($el, node.props);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}

function changed(node1, node2) {
    return (typeof node1 === "undefined" ? "undefined" : _typeof(node1)) !== (typeof node2 === "undefined" ? "undefined" : _typeof(node2)) || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type;
}

function updateElement($parent, newNode, oldNode) {
    var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    if (!oldNode) {
        $parent.appendChild(createElement(newNode));
    } else if (!newNode) {
        $parent.removeChild($parent.childNodes[index]);
    } else if (changed(newNode, oldNode)) {
        $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    } else if (newNode.type) {
        updateProps($parent.childNodes[index], newNode.props, oldNode.props);
        var newLength = newNode.children.length;
        var oldLength = oldNode.children.length;
        for (var i = 0; i < newLength || i < oldLength; i++) {
            updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
        }
    }
}

//set props
function setProp($target, name, value) {
    if (typeof value === "boolean") {
        setBooleanProp($target, name, value);
    } else {
        $target.setAttribute(name, value);
    }
}
function setBooleanProp($target, name, value) {
    if (value) {
        $target.setAttribute(name, value);
        $target[name] = true;
    } else {
        $target[name] = false;
    }
}
function removeBooleanProp($target, name) {
    $target.removeAttribute(name);
    $target[name] = false;
}
function removeProp($target, name, value) {
    if (typeof value === "boolean") {
        removeBooleanProp($target, name);
    } else {
        $target.removeAttribute(name);
    }
}
function setProps($target, props) {
    props && Object.keys(props).forEach(function (name) {
        setProp($target, name, props[name]);
    });
}
function updateProp($target, name, newVal, oldVal) {
    if (!newVal) {
        removeProp($target, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
        setProp($target, name, newVal);
    }
}
function updateProps($target, newProps) {
    var oldProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(function (name) {
        updateProp($target, name, newProps[name], oldProps[name]);
    });
}

var content = document.querySelector("#content");
updateElement(content, vdom);
setTimeout(function () {
    updateElement(content, vdom1, vdom);
}, 3000);

/* fed123.com */
'use strict';

var vdom = vnode(
    "div",
    { id: "_Q5", style: "border: 1px solid red;" },
    vnode(
        "div",
        { style: "text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;" },
        vnode("img", { src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png", height: "56", style: "border: none; margin: 8px 0px;" }),
        "hello"
    )
);

var vdom1 = vnode(
    "div",
    { id: "_Q5", style: "border: 1px solid green;" },
    vnode(
        "div",
        { style: "text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;" },
        vnode("img", { src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png", height: "56", style: "border: none; margin: 8px 0px;" }),
        "google"
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
    updateProps($el, node.props);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}

function updateElement($parent, newnode, oldnode) {
    var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    if (!newnode) {
        $parent.removeChild($parent.childNodes[index]);
    } else if (!oldnode) {
        $parent.appendChild(createElement(newnode));
    } else if (isChange(newnode, oldnode)) {
        $parent.replaceChild(createElement(newnode), $parent.childNodes[index]);
    } else if (newnode.type) {
        updateProps($el, newnode.props, oldnode.props);
        var newL = newnode.children.length;
        var oldL = oldnode.children.length;
        for (var i = 0; i < newL || i < oldL; i++) {
            updateElement($parent.childNodes[index], newnode.children[i], oldnode.children[i], i);
        }
    }
}
function isChange(newnode, oldnode) {
    return !newnode || !oldnode || !newnode.type !== oldnode.type || typeof newnode == "string" && newnode != oldnode;
}

//handle props

function setProp($el, name, value) {
    if (typeof value == "boolean") {
        handleBoolProp($el, name, value);
    } else {
        $el.setAttribute(name, value);
    }
}
function handleBoolProp($el, name, value) {
    if (!!value) {
        $el.setAttribute(name, value);
        $el[name] = !!value;
    } else {
        $el[name] = !!value;
    }
}
function removeProp($el, name, value) {
    if (typeof value == "boolean") {
        $el[name] = false;
    }
    $el.removeAttribute(name, value);
}
function updateProp($el, name, newvalue, oldValue) {
    if (!newvalue) {
        removeProp($el, name, oldValue);
    } else if (!oldValue || newvalue != oldValue) {
        setProp($el, name, newvalue);
    }
}
function updateProps($el) {
    var newprops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var oldProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var _props = Object.assign({}, newprops, oldProps);
    Object.keys(_props).forEach(function (key) {
        updateProp($el, key, newprops[key], oldProps[key]);
    });
}

var content = document.querySelector("#content");
updateElement(content, vdom);
setTimeout(function () {
    updateElement(content, vdom1, vdom);
}, 3000);

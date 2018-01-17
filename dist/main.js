/* fed123.com */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isType = function isType(type) {
    return function (val) {
        return (typeof val === "undefined" ? "undefined" : _typeof(val)) == type;
    };
};

var isNumber = isType("number");
var isString = isType("string");
var isBoolean = isType("boolean");

/**
 *  事件处理模块
 */

function isEvtProp(name) {
    return name.match(/^on/); ///^on/.test(name)
}
function isCustomProp(name) {
    return isEvtProp(name) || name === "forceUpdate";
}
function extractEventName(name) {
    return name.slice(2).toLowerCase();
}
/**
 * 处理事件绑定
 * @param {*}  
 * @param {*} props 
 */
function addEvtListener($el, props) {
    props && Object.keys(props).forEach(function (key) {
        if (isEvtProp(key)) {
            $el.addEventListener(extractEventName(key), props[key]);
        }
    });
}

/**
 *  属性处理模块
 */
function setProp($el, name, value) {
    if (isCustomProp(name)) return;
    if (isBoolean(value)) {
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
    if (isCustomProp(name)) return;
    if (isBoolean(value)) {
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
/**
 * 更新或者创建元素属性值
 * @param {*}  
 * @param {*} newprops 
 * @param {*} oldProps 
 */
function updateProps($el) {
    var newprops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var oldProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var _props = Object.assign({}, newprops, oldProps);
    Object.keys(_props).forEach(function (key) {
        updateProp($el, key, newprops[key], oldProps[key]);
    });
}

/**
 * vnode model
 * @param {*} type 
 * @param {*} props 
 * @param {*} children 
 */
function vnode(type, props) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    return { type: type, props: props, children: children };
}

/**
 * 创建虚拟节点
 * @param {*} node 
 */
function createElement(node) {
    if (isString(node) || isNumber(node)) {
        return document.createTextNode(node);
    }
    var $el = document.createElement(node.type);
    updateProps($el, node.props);
    addEvtListener($el, node.props);
    node.children && node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}

/**
 * 更新元素
 * @param {*}  
 * @param {*} newnode 
 * @param {*} oldnode 
 * @param {*} index 
 */
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

/**
 * 检查变化
 * @param {*} newnode 
 * @param {*} oldnode 
 */
function isChange(newnode, oldnode) {
    return !newnode || !oldnode || !newnode.type !== oldnode.type || isString(newnode) && newnode != oldnode || !!newnode.forceupdate;
}

var count = 0;
var vdom = function vdom() {
    return vnode(
        "div",
        { id: "_Q5", style: "border: 1px solid red;" },
        vnode(
            "div",
            { style: "text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;" },
            vnode("img", { src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png", height: "56", style: "border: none; margin: 8px 0px;", onClick: addCount }),
            "hello ",
            count
        )
    );
};

var content = document.querySelector("#content");

var olddom = vdom();
updateElement(content, olddom);

function addCount() {
    count++;
    updateElement(content, vdom(), olddom);
}

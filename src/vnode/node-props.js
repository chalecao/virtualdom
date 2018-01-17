const vdom = (
    <div id="_Q5" style="border: 1px solid red;">
        <div style="text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;">
            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png" height="56" style="border: none; margin: 8px 0px;"></img>
            <span>hello</span>
            google
        </div>
    </div>)

const vdom1 = (
    <div id="_Q5" style="background: red;">
        <div style="text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;">
            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png" height="56" style="border: 1px solid red; margin: 8px 0px;"></img>
            <span>world</span>
            chrome
        </div>
    </div>)

function vnode(type, props, ...children) {
    return { type, props, children };
}

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    // set props
    setProps($el, node.props);
    node.children
        .map(createElement)
        .forEach($el.appendChild.bind($el));
    return $el;
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type
}

function updateElement($parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
        $parent.appendChild(
            createElement(newNode)
        );
    } else if (!newNode) {
        $parent.removeChild(
            $parent.childNodes[index]
        );
    } else if (changed(newNode, oldNode)) {
        $parent.replaceChild(
            createElement(newNode),
            $parent.childNodes[index]
        );
    } else if (newNode.type) {
        updateProps(
            $parent.childNodes[index],
            newNode.props,
            oldNode.props
        );
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
            updateElement(
                $parent.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            );
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
    props && Object.keys(props).forEach(name => {
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
function updateProps($target, newProps, oldProps = {}) {
    const props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(name => {
        updateProp($target, name, newProps[name], oldProps[name]);
    });
}

let content = document.querySelector("#content")
updateElement(content, vdom);
setTimeout(() => {
    updateElement(content, vdom1, vdom);
}, 3000)
import {updateProps} from "./handleProps"
import {addEvtListener} from "./handleEvt"
import {isString, isNumber} from "./util"
/**
 * vnode model
 * @param {*} type 
 * @param {*} props 
 * @param {*} children 
 */
export function vnode(type, props, ...children) {
    return { type, props, children };
}

/**
 * 创建虚拟节点
 * @param {*} node 
 */
export function createElement(node) {
    if (isString(node) || isNumber(node)) {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    updateProps($el, node.props)
    addEvtListener($el,node.props)
    node.children && node.children
        .map(createElement)
        .forEach($el.appendChild.bind($el));
    return $el;
}
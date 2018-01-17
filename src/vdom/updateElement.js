import {updateProps} from "./handleProps"
import {createElement}  from "./createElement"
import {isString} from "./util"

/**
 * 更新元素
 * @param {*}  
 * @param {*} newnode 
 * @param {*} oldnode 
 * @param {*} index 
 */
export function updateElement($parent, newnode, oldnode, index = 0) {
    if (!newnode) {
        $parent.removeChild($parent.childNodes[index])
    } else if (!oldnode) {
        $parent.appendChild(createElement(newnode))
    } else if (isChange(newnode, oldnode)) {
        $parent.replaceChild(createElement(newnode),
            $parent.childNodes[index])
    } else if (newnode.type) {
        updateProps($el, newnode.props, oldnode.props)
        let newL = newnode.children.length;
        let oldL = oldnode.children.length;
        for (var i = 0; i < newL || i < oldL; i++) {
            updateElement($parent.childNodes[index],
                newnode.children[i],
                oldnode.children[i],
                i);
        }
    }
}

/**
 * 检查变化
 * @param {*} newnode 
 * @param {*} oldnode 
 */
function isChange(newnode, oldnode) {
    return !newnode || !oldnode ||
        !newnode.type !== oldnode.type ||
        (isString(newnode) && newnode != oldnode) ||
        !!newnode.forceupdate
}
/**
 *  属性处理模块
 */
import {isBoolean} from "./util"
import {isCustomProp,isEvtProp} from "./handleEvt"

function setProp($el, name, value) {
    if(isCustomProp(name)) return;
    if (isBoolean(value)) {
        handleBoolProp($el, name, value)
    } else {
        $el.setAttribute(name, value)
    }
}
function handleBoolProp($el, name, value) {
    if (!!value) {
        $el.setAttribute(name, value)
        $el[name] = !!value;
    } else {
        $el[name] = !!value;
    }
}
function removeProp($el, name, value) {
    if(isCustomProp(name)) return;
    if (isBoolean(value)) {
        $el[name] = false;
    }
    $el.removeAttribute(name, value)

}
function updateProp($el, name, newvalue, oldValue) {
    if (!newvalue) {
        removeProp($el, name, oldValue)
    } else if (!oldValue || newvalue != oldValue) {
        setProp($el, name, newvalue)
    }
}
/**
 * 更新或者创建元素属性值
 * @param {*}  
 * @param {*} newprops 
 * @param {*} oldProps 
 */
export function updateProps($el, newprops ={}, oldProps = {}) {
    let _props = Object.assign({}, newprops, oldProps)
    Object.keys(_props).forEach(key =>{
        updateProp($el, key, newprops[key], oldProps[key])
    })
}

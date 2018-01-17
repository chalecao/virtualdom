/**
 *  事件处理模块
 */

export function isEvtProp(name){
    return name.match(/^on/)  ///^on/.test(name)
}
export function isCustomProp(name) {
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
export function addEvtListener($el, props){
    props && Object.keys(props).forEach(key=>{
        if(isEvtProp(key)){
           $el.addEventListener(extractEventName(key), props[key])
        }
    })
}
const vdom = (
    <div id="_Q5" style="border: 1px solid red;">
        <div style="text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;">
            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png" height="56" style="border: none; margin: 8px 0px;"></img>
            hello
        </div>
    </div>)

const vdom1 = (
    <div id="_Q5" style="border: 1px solid red;">
        <div style="text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;">
            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png" height="56" style="border: none; margin: 8px 0px;"></img>
            google
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
    node.children
        .map(createElement)
        .forEach($el.appendChild.bind($el));
    return $el;
}

function updateElement($parent, newnode, oldnode, index = 0){
    if(!newnode){
        $parent.removeChild($parent.childNodes[index])
    }else if(!oldnode){
        $parent.appendChild(createElement(newnode))
    }else if(isChange(newnode, oldnode)){
        $parent.replaceChild(createElement(newnode),
        $parent.childNodes[index])
    }else if(newnode.type){
        let newL = newnode.children.length;
        let oldL = oldnode.children.length;
        for(var i=0; i<newL || i< oldL; i++){
            updateElement($parent.childNodes[index], 
            newnode.children[i],
            oldnode.children[i],
            i);
        }
    }
}
function isChange(newnode, oldnode){
    return !newnode || !oldnode ||
        !newnode.type !== oldnode.type ||
        (typeof newnode == "string" && newnode != oldnode)
}

let content = document.querySelector("#content")
updateElement(content, vdom);
setTimeout(()=>{
    updateElement(content, vdom1, vdom);
}, 3000)
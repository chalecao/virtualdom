import { updateElement } from "./vdom/updateElement"
import { vnode } from "./vdom/createElement"


let count = 0;
const vdom = ()=>{ return (
    <div id="_Q5" style="border: 1px solid red;">
        <div style="text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;">
            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png" height="56" style="border: none; margin: 8px 0px;" onClick={addCount}></img>
            hello {count}
        </div>
    </div>)}


let content = document.querySelector("#content")
let olddom = vdom();
updateElement(content, olddom);

function addCount(){
    count++;
    updateElement(content, vdom(), olddom);
}




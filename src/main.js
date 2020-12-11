import "./style.css";
import jquery from 'jquery';
globalThis.jQuery
    = globalThis.$ = jquery;
import Template from "./js/template";
import Html from "./js/html";
import Factory from "./js/factory";

let app = globalThis[Template.appName()] = {
    base: new Factory(Config),
    view: new Html("section", {"id":Template.appName()})
};
$(document).ready(()=>{
    console.log(app);
})

// function zFlip(element){
//     $(element).toggleClass("z-hide");
// }
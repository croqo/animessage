import "./style.css";
import jquery from 'jquery';
globalThis.jQuery
    = globalThis.$ = jquery;
import Template from "./js/template";
import Factory from "./js/factory";
import Html from "./js/html";

let app = globalThis[Template.appName()] = {
    base: new Factory(Config),
    play: function(code){
        console.log(`Click: play(${code})`);

    }
};
$(document).ready(()=>{
    console.log(app);
})

// function zFlip(element){
//     $(element).toggleClass("z-hide");
// }
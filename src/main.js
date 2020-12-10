import "./style.css";
import jquery from 'jquery';
globalThis.jQuery
    = globalThis.$ = jquery;
import Setup from "./js/setup";
import Template from "./js/template";

let app = globalThis[Template.appName()] = {
    config: Сonfig
};
$(document).ready(()=>{
    app.html = Template.appHtml();
    console.log("app container injected to body");
    $.when(
        $.each(app.config, function (name, units){
            let setup = new Setup(name);
            setTimeout(()=>{
                setup.content=units;
            });
            app.config[name] = setup;
        })
    ).then(function (){
        console.log(app.config);
    });
    setTimeout(()=>{
        console.log("content ready?");
    })
})

// function zFlip(element){
//     $(element).toggleClass("z-hide");
// }
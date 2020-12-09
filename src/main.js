import "./style.css";
import jquery from 'jquery';
globalThis.jQuery
    = globalThis.$ = jquery;
import {Howl} from 'howler'
import lottie from 'lottie-web';
import Unit from "./js/unit";
import Setup from "./js/setup";
import Template from "./js/template";

let app = globalThis[Template.appName()] = {
    html: $(`<div id="${Template.appName()}"></div>`)
};

setTimeout(()=>{
    app.data = Сonfig;
    console.log("Config ready");
    setTimeout(()=>{
        app.html = $(Template.appHtml()).appendTo("body");
        console.log("app container injected to body");
        $.when(
            $.each(app.data, function (name, units){
                let setup = new Setup(name);
                setTimeout(()=>{
                    setup.getContent(units);
                });
                app.data[name] = setup;
            })
        ).then(function (){
            console.log(app.data);
        });
        setTimeout(()=>{
            console.log("content ready?");
        })
    });
})

// function zFlip(element){
//     $(element).toggleClass("z-hide");
// }
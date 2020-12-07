import "./style.css";
import jquery from 'jquery';
globalThis.jQuery
    = globalThis.$ = jquery;
import {Howl} from 'howler'
import lottie from 'lottie-web';
import Unit from "./js/unit";
import Setup from "./js/setup";

const appName = "aniMessage";

let app = globalThis[appName] = {
    html: $(`<div id="${appName}"></div>`)
};

setTimeout(()=>{
    app.data = Сonfig;
    console.log("Config ready");
    setTimeout(()=>{
        app.html = $(app.html).appendTo("body");
        console.log("app container injected to body");
        $.when(
            $.each(app.data, function (name, units){
                let setup = new Setup(name);
                setup.inject(app.html);
                console.log(setup);
                $.each(units, function (unit_name, unit_data){
                    setup.array.push(new Unit(unit_name, unit_data))
                });
                app.data[name] = setup;
            })
        ).then(function (){
            console.log(app.data);
            console.log("content ready?");
        });
        setTimeout(()=>{
        })
    });
})

// function zFlip(element){
//     $(element).toggleClass("z-hide");
// }
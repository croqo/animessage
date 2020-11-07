import "./style.css";
import jquery from 'jquery';
globalThis.jQuery
    = globalThis.$ = jquery;
import {Howl} from 'howler'
globalThis.Howl = Howl;
import lottie from 'lottie-web';
globalThis.lottie = lottie;

import Base from './base.json';


import Query from "./js/query";
const appName = "animal"

let app = globalThis[appName] = {
    base: Base,
    x: {},
    html: $(`<div id="${appName}" style="position: absolute; width: 100vw; height: 100vh; top: 0; left: 0"></div>`),
    query: new Query(),
};
let
    defBase = $.Deferred(),
    defQuery = $.Deferred(),
    defHtml = $.Deferred(),
    defReady = $.Deferred()
;
defBase.resolve(app.base);
defBase.done(function (){
    let code = getCode(app.query.search);
    if (!!(app.base[code])){
       return defQuery.resolve(code);
    }
});
defQuery.done(function (code){
    console.log(app.base[code]);

    let html = getHtml(app.base[code]);
})

function getCode(search){
    let s = search.toString();
    return s.slice(1);
}
function getHtml(obj){
    Object.keys(obj).forEach(function (code){
        let
            option = obj[code],
            html = $(
                `<figure id="${option.name}" class="${option.type} z-hide"></figure>`
            );
        Object.keys(option).forEach(function (prop){
            html.data("prop", option[prop])
        });
        return html;
    })
}
import "./style.css";
import jquery from 'jquery';
globalThis.jQuery
    = globalThis.$ = jquery;
import {Howl} from 'howler'
globalThis.Howl = Howl;
import lottie from 'lottie-web';
globalThis.lottie = lottie;

import Base from './base.json';
import animationData from './_lottie.json';

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
       return defQuery.resolve(app.base[code]);
    }
});
defQuery.done(function (data){
    Object.keys(data).forEach(function (value){
        let it = data[value];
        app.x[value] = (value in app.x) ? [...app.x[value], ...it] : it;
    });
}).then(function (){
    $.when(
        $(app.html).appendTo("body")
    ).then(function (){
        Object.keys(app.x).forEach(function (key){
            let it = app.x[key],
                html = $(`<figure class="lottie-player ${it['type'] || ''}"></figure>`).appendTo(`#${appName}`);
            Object.keys(it).forEach(function (prop){
                switch (prop){
                    case 'path': {
                        JSON.stringify($.getJSON(it.path).done(function (data){
                            console.log(data)
                            it['animationData'] = data;
                        }));
                        break;
                    }
                    default: $(html).attr(`data-${prop}`, it[prop])
                }
            })
        })
    });
    console.log(app)
});

function getCode(search){
    let s = search.toString();
    return s.slice(1);
}
function getHtml(obj){
    Object.keys(obj).forEach(function (code){
        let
            option = obj[code],
            html = $(`<figure id="${option.name}" class="${option.type} z-hide"></figure>`);
        Object.keys(option).forEach(function (prop){
            console.log(prop);
            html.data("prop", option[prop])
        });
        return html;
    })
}
function getAnimationData(fileName){
    return animationData[fileName]
}
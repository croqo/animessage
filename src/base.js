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
const
    code = app.code = getCode(),
    base = getBase(code)
;

defBase.resolve(app.base);
defBase.done(function (){
    if (!!(base)){
       return defQuery.resolve(base);
    }
});
defQuery.done(function (data){
    Object.keys(data).forEach(function (value){
        let it = data[value]; it.name = value;
        app.x[value] = (value in app.x) ? [...app.x[value], ...it] : it;
    });
}).then(function (){
    $.when(
        $(app.html).appendTo("body")
    ).then(function (){
        Object.keys(app.x).forEach(function (key){
            let it = app.x[key],
                html = $(`<figure id="#${appName}-${it.name}" class="lottie-player ${it['type'] || ''}"></figure>`).appendTo(`#${appName}`)
            ;
            Object.keys(it).forEach(function (prop){
                $(html).attr(`data-${prop}`, it[prop])
            })
        })
    }).done(()=>{
        defHtml.resolve($(`#${appName}`))
    });
    console.log(app)
});
defHtml.done((html)=>{
    defReady.resolve(
        $.each($(html).find("figure"), function (){
            const
                id = ($(this).attr("id")).slice(appName.length+2),
                player = app.x[id]
            ;
            app.x[id] = lottie.loadAnimation({
                container: this,
                animationData: getAnimationData(player.lottie),
                autoplay: true,
                loop: true
            });
            console.log(app.x[id]);
        })
    )
});
defReady.done(()=>{
    console.log(app);
})
function getCode(){
    let s = app.query.search.toString();
    return s.slice(1);
}
function getBase(code){
    return Base[code]
}
function getAnimationData(fileName){
    return animationData[fileName]
}
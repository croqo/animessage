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
    x: {},
    html: $(`<div id="${appName}" style="position: absolute; width: 100vw; height: 100vh; top: 0; left: 0"></div>`),
    query: new Query(),
};
const
    defBase = $.Deferred(),
    defQuery = $.Deferred(),
    defHtml = $.Deferred(),
    defReady = $.Deferred()
;
defQuery.resolve(getCode());
defQuery.done(code =>{
    app.code = code;
    return defQuery.promise(code)
});
defBase.resolve(getBase(app.code));
defBase.done(base =>{
    $.when(
        app.data = base,
        $(app.html).appendTo("body")
    ).then(function (){
        Object.keys(app.data).forEach(function (key){
            let it = app.data[key],
                html = $(`<figure id="#${appName}-${key}" class="lottie-player ${it['type'] || ''}"></figure>`).appendTo(`#${appName}`)
            ;
            Object.keys(it).forEach(function (prop){
                $(html).attr(`data-${prop}`, it[prop])
            })
        })
    }).done(()=>{
        let res = $(`#${appName}`);
        return defHtml.resolve(res)
    });
});
defHtml.done((html)=>{
    $.each($(html).find("figure"), function (){
        const
            id = getId(this),
            player = app.data[id]
        ;
        app.x[id] = lottie.loadAnimation({
            container: this,
            animationData: getAnimationData(player.lottie),
            autoplay: true,
            loop: true
        });
        console.log(app.x[id]);
    })

    defReady.resolve(
    )
});
defReady.done(()=>{
    console.log(app);
})
function getId(figure){
    let
        el = $(figure).attr("id"),
        f = el.split("-");
    return f[1]
}
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
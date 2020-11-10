import "./style.css";
import jquery from 'jquery';
globalThis.jQuery
    = globalThis.$ = jquery;
import {Howl} from 'howler'
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
                id = `${appName}-${key}`,
                type = "lottie-player"+((!!it.type) ?` ${it.type}` :"")
            ;
            if (!!it.audio) {
                it.audioData = new Howl({
                    src: [it.audio]
                })
            }
            if (!!it.lottie) it.animationData = getAnimationData(it.lottie);

            $.when(
                $(`<figure id="#${id}" class="${type}"></figure>`).appendTo(`#${appName}`)
            ).then(()=>{
                app.data[key]=it;
            })
            // Object.keys(it).forEach(function (prop){
            //     $(html).attr(`data-${prop}`, it[prop])
            // })
        })
    }).done(()=>{
        let res = $(`#${appName}`);
        return defHtml.resolve(res)
    });
});
$.when(
    defHtml.done((html)=>{
        $.each($(html).find("figure"), function (){
            const id = getId(this);
            app.data[id].container = this;
        })
    })
).then(()=>{
    defReady.resolve(
        $.each(app.data, function (id, config){
            const
                x = app.x[id] = getLottie(config),
                y = config.audioData || false,
                z = $.Deferred()
            ;
            if (!!y) {
                setInterval(()=>{
                    if (y.state() === "loaded") {
                        clearInterval(z);
                        z.resolve(y);
                    } else {
                        console.log(y.state())
                    }

                },200)}
            else {
                z.resolve(false)
            }
            z.done((y)=>{
                x.play();
                if (y) y.play()
            })
            // audio.play();

        })
    );
})
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
function getLottie(config){
    config.autoplay = config.autoplay || false;
    return lottie.loadAnimation(config)
}
function getAudio(path){
    const res = $.Deferred();
    return res.resolve(new Howl({
        src: [path]
    }))
}
function start(data){

}
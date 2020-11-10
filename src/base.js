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
                type = "lottie-player"+((!!it.type) ?` ${it.type}` :"")+" z-hide"
            ;
            if (!!it.audio) {
                it.audioData = new Howl({
                    src: [it.audio]
                })
            }
            if (!!it.lottie) it.animationData = getAnimationData(it.lottie);
            it.message = (!!it.text) ?`<div class="message box"><p>${it.text}</p></div>` :"";

            $.when(
                it.html = $(`<figure id="#${id}" class="${type}"></figure>`).appendTo(`#${appName}`)
            ).then(()=>{
                app.data[key]=it;
            })
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
                player = {
                    lottie: getLottie(config),
                    message: config.text || false,
                    audio: config.audioData || false,
                    ready: $.Deferred()
                };
            player.ready.resolve(function (){
                if (!!player.audio) {
                    const
                        a = player.audio,
                        i = setInterval(()=>{
                                if (a.state() === "loaded") {
                                    clearInterval(i);
                                } else {
                                    console.log(a.state())
                                }
                            },200);
                }
            });
            app.x[id] = player
        })
    );
})
defReady.done(()=>{
    $.when(
        $.each(app.x, (id, data)=>{
            const i = setInterval(()=>{
                if (data.ready.state()==="resolved"){
                    clearInterval(i)
                } else {
                    console.log(`${id} state: ${data.ready.state()}`)
                }
            }, 100)
        })
    ).then(()=>{
        $.each(app.x, (id, data)=>{
            const
                config = app.data[id];

            setTimeout(()=>{
                if (!!data.message) $(config.container)
                    .append($(config.message));
                if (!!data.audio) data.audio.play();
                data.lottie.play();
                zFlip(config.container);
                setTimeout(()=>{
                    if (!!data.audio) data.audio.stop();
                    data.lottie.stop();
                    zFlip(config.container);
                }, (!!config.length) ?config.length :8000)
            }, (!!config.delay) ?config.delay :100)
        })
    })
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
function zFlip(element){
    $(element).toggleClass("z-hide");
}
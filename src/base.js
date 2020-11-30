import "./style.css";
import jquery from 'jquery';
globalThis.jQuery
    = globalThis.$ = jquery;
import {Howl} from 'howler'
import lottie from 'lottie-web';
globalThis.lottie = lottie;

const appName = "aniMessage"

let app = globalThis[appName] = {
    x: {},
    data: Config,
    html: $(`<div id="${appName}" style="position: absolute; width: 100vw; height: 100vh; top: 0; left: 0"></div>`),
    play: function (code){
        cleanup();
        const
            defBase = $.Deferred(),
            defQuery = $.Deferred(),
            defHtml = $.Deferred(),
            defReady = $.Deferred()
        ;
        defQuery.resolve(code);
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

                    it.audioData =
                        (!!it.audio)
                            ? new Howl({
                                src: [it.audio],
                                html5: true,
                                preload: 'auto'
                            })
                            : false
                    ;

                    if (!!it.lottie) it.path = it.lottie;
                    it.message = (!!it.text) ?`<div class="message box"><p>${it.text.toString()}</p></div>` :"";
                    it.rendererSettings = {
                        preserveAspectRatio: (!!it.scaling) ?'xMidYMid slice' :'xMidYMid meet',
                        filterSize: {
                            width: '200%',
                            height: '200%',
                            x: '-50%',
                            y: '-50%',
                        },
                        progressiveLoad:true
                    }

                    $.when(
                        it.html = $(`<figure id="#${id}" class="${type}">${it.message}</figure>`).appendTo(`#${appName}`)
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
            $.when(
                $.each(app.data, function (id, config){
                    const self = config;
                    app.x[id] = {
                        lottie: getLottie(self),
                        message: self.text || false,
                        audio: self.audioData,
                        container: self.container
                    };
                })
            ).then(
                defReady.resolve()
            )
        });
        defReady.done(()=>{
            $.each(app.x, (id, data)=>{
                console.log(data);
                let def = $.Deferred();
                if (!!data.audio) {
                    let i = setInterval(function (){
                        if (data.audio.state() !== 'loaded'){
                            console.log(data.audio.state())
                        } else {
                            clearInterval(i);
                            def.resolve();
                        }
                    }, 50);
                } else {
                    def.resolve()
                }
                def.done(function (){
                    setTimeout(()=>{
                        // $(data.container).append($(data.message));
                        if (!!data.audio) data.audio.id = data.audio.play();
                        data.lottie.play();
                        zFlip(data.container);
                        setTimeout(()=>{
                            if (!!data.audio) data.audio.stop();
                            data.lottie.stop();
                            zFlip(data.container);
                        }, (!!data.length) ?data.length :8000)
                    }, (!!data.delay) ?data.delay :10)                })
            })
        })

    }
};

function cleanup(){
    $.each(app.x, (id, data)=>{
        if (!!data.audio) data.audio.stop();
        if (!!data.lottie) data.lottie.stop();
    });
    $(`#${appName} figure`).each(function (){
        $(this).remove()
    });
    app.x = {}
}

function getId(figure){
    let
        el = $(figure).attr("id"),
        f = el.split("-");
    return f[1]
}
function getBase(code){
    return Config[code]
}
function getLottie(config){
    config.autoplay = config.autoplay || false;
    return lottie.loadAnimation(config)
}
function zFlip(element){
    $(element).toggleClass("z-hide");
}
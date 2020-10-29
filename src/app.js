import "./style.css";
import jquery from 'jquery';
globalThis.jQuery
    = globalThis.$ = jquery;
import {Howl} from 'howler'
globalThis.Howl = Howl;
import lottie from 'lottie-web';
globalThis.lottie = lottie;

import Query from "./js/query";
const appName = "animal"

let app = globalThis[appName] = {
    setup: {},
    html: $(`<div id="${appName}"></div>`),
    query: new Query(),
    getQuery: function (){
        app.query.searchParams.forEach(
            function (value, key)
            {
                let
                    i = Query.split(key),
                    id = i[0], prop = i[1];

                app.setup[id] = (id in app.setup)
                    ? app.setup[id]
                    : {["name"]:id}
                ;

                if (typeof id === "undefined") { id = "default" }
                let v = {[prop]: value};
                app.setup[id] = {...app.setup[id], ...v};
            });
        return {...app.setup};
    }
};

let defQuery = $.Deferred();
defQuery.resolve(app.getQuery());
$(document).ready(function () {
    app.html.appendTo("body");
    defQuery.done(function (query){
        Object.keys(query).forEach(function (i){
            let option = query[i];
            let html = $("<figure></figure>");
            Object.keys(option).forEach(function (prop){
                console.log(option[prop]);
                html.data(prop, option[prop]);
            });
            app.html.append(html);
        })
    }).done(function (){
        $.each($(`#${appName} figure`), function (){
            let audio = $(this).data("audio");
            let motion = lottie.loadAnimation({
                container: this,
                name: $(this).data("name"),
                path: $(this).data("path"),
                loop: (!!$(this).data("loop")),
                autoplay: false,
                renderer: "svg",
                audioFactory: new Howl({
                    src:[audio]
                })
            });
            motion.setSpeed($(this).data("speed") || 1.0);
            motion.delay = $(this).data("delay");
            motion.start = function (){
                setTimeout(function (){
                    motion.play()
                },)
            }
            console.log(motion);
        });
    });
});


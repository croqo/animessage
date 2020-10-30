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
    x: {},
    html: $(`<div id="${appName}" style="position: absolute; width: 100vw; height: 100vh; top: 0; left: 0"></div>`),
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
    app.html.prependTo("body");
    defQuery.done(function (query){
        Object.keys(query).forEach(function (i){
            let
                option = query[i],
                html = $(`<figure id="${option.name}" class="${option.type}"></figure>`);
            let defJson = $.Deferred();
            $.when(

            )
            Object.keys(option).forEach(function (prop){
                switch (prop) {
                    // case "path":
                    //     option.animationData = getJson(option.path);
                    //     defJson.resolve(option.animationData);
                    //
                    //     html.data(prop, option[prop]);
                    //     break;
                    default:
                        html.data(prop, option[prop]);
                        defJson.resolve();
                        break;
                }
            });
            app.html.append(html);
            console.log(app);
        })
    }).done(function (){
        Object.keys(app.setup).forEach(function (i){
            let $this = app.setup[i],
                defContainer = $.Deferred(),
                defJson = $.Deferred();
            app.x[i] = $this;

            Object.keys($this).forEach(function (prop){
                let $it = $this[prop];
                app.x[i][prop] = $it;

                switch (prop){
                    case "path":
                        $this.container = $(`#${appName} figure#${i}`).get(0);
                        $this.path = $it;
                        // app.x[i].animationData = defJson.promise();
                        defContainer.resolve();
                        console.log(app.x);
                }
                defJson.resolve(
                    app.x[i].animationData = $.getJSON($it,
                        function (json){
                        }))
            });
            $.when(
                defContainer,
                defJson.done()
            ).then(function (){
                console.log($this);
                app.x[i] = lottie.loadAnimation({
                    path: $this.path,
                    container: $this.container,
                    loop: !($this.loop==="no"),
                    autoplay: false,
                    rendererSettings: {
                        progressiveLoad: true,
                        preserveAspectRatio: 'xMidYMid slice'
                    }
                });

            }).then(function (){
                setTimeout(function (){
                    app.x[i].setSpeed($this.speed || 1.0);
                    app.x[i].play();
                }, $this.delay || 0)
            })
        })
    }).done(function (){
        let animationData;
        Object.keys(app.setup).forEach(function (i){
            let $this = app.setup[i];
            console.log($this);

        });
    });
});
function getJson(path){
    // get JSON if found
    if (new RegExp(/\w.json$/).test(path)===true)
    {
        $.getJSON(path,
            function (json){
            }).done(function (json){
                console.log(json)
            return json
        });
    }

}


import jquery from 'jquery';
import lottie from 'lottie-web';
import {Howl} from 'howler'
import Player, {player, PlayerConfig} from "./js/player";
import $ from "jquery";
import Query from "./js/query";
import "./style.css";


// let Type = Enum.define("Type",
//         {
//             constants:
//                 {
//                     raw: {},
//                     message: {"text": "text" },
//                     lottie: lottie
//                 }
//         }
//     );
Object.assign(
    window,{
        $: jquery,
        lottie: lottie,
        Howl:   Howl,
        xQ: new Query(),
        xP: {}
    });
window.x = new Proxy({}, {
    get: function(object, property) {
        return object.hasOwnProperty(property) ? object[property] : {};
    }
});

// Event handlers
$(document).on("query", function ()
{
    xQ.get().then(function (res)
    {
        for (let i in res)
        {
            x[i] =
                {
                    ...x[i],
                    ...res[i]
                };
                x[i]["player"] = Player.get(x[i]);
        }
    });
});
$(document).trigger("query");
$(document).ready(function () {
    window.motion = {}
    for (let i in x) {
        let d = x[i];
        d.container = Player.container(i);
        d.delay = ("delay" in d) ? d.delay : 100;
        d.speed = ("speed" in d) ? d.speed : 1.0;
        // noinspection CommaExpressionJS
        motion[i] =
            {
                sound: new Howl({
                    src: [(d.audio)]
                }),
                anima: lottie.loadAnimation(
                    {
                        path: d.path,
                        autoplay: false,
                        container: d.container,
                        rendererSettings: {
                            progressiveLoad: true,
                            preserveAspectRatio: 'xMidYMid slice',
                            filterSize: {
                                width: '200%',
                                height: '200%',
                                x: '-50%',
                                y: '-50%',
                            }
                        }
                    }),
                play: function () {
                    this.anima.play();
                    this.sound.play();
                },
                speed: function (amount) {
                    this.anima.setSpeed(amount);
                    this.sound.rate(amount);
                },
                stop: function () {
                    this.anima.stop();
                    this.sound.stop();
                },
                start: function () {
                    this.speed(d.speed);
                    setTimeout(()=>
                    {
                        this.z();
                        this.play();
                    }, d.delay);
                },
                z: function ()
                {
                    $(d.container).toggleClass("z-hide");
                }
            };
        }
    $(document).trigger("start");
});
$(document).on("start", function ()
{
    for (let i in window.motion) {

        let p = window.motion[i];
        p.start();
    }
});


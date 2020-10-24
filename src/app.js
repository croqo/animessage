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

            console.log(x[i]);
        }

    });

});
$(document).trigger("query");
$(document).ready(function () {
    window.motion = {}
    for (let i in x)
    {
        motion[i] =
            {
                sound: new Howl({
                    src: [(x[i].audio)]
                }),
                anima: lottie.loadAnimation(
                    {
                        path: x[i]["path"],
                        autoplay: false,
                        container: Player.container(i),
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
                play: function ()
                {
                    this.anima.play();
                    this.sound.play();
                },
                speed: function (amount)
                {
                    this.anima.setSpeed(amount);
                    this.sound.rate(amount);
                },
                stop: function ()
                {
                    this.anima.stop();
                    this.sound.stop();
                }
            }
    }
    console.log(motion);
});


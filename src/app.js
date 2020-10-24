import jquery from 'jquery';
import lottie from 'lottie-web';
import {Howl} from 'howler'
import Player, {player, PlayerConfig} from "./js/player";
import $ from "jquery";
import Query from "./js/query";

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
// $(document).on("audio_loaded", function (e, element)
// {
//     globalThis.x[element.name]["audioFactory"] = element["audioFactory"];
//     $(document).trigger("player", element, e);
// });
// $(document).on("json_loaded", function (e ,id)
// {
//     console.log(id);
//     console.log(e);
//     globalThis.x[id] = {...globalThis.x[id], e};
//     // $(document).trigger("player", element, e);
// });
function createSound(assetPath) {
    return
}
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
                        container: Player.container(i)
                    }),
                play: function ()
                {
                    this.anima.play();
                    this.sound.play();
                }
            }
    }
    console.log(motion);
});

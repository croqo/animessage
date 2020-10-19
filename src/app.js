import jquery from 'jquery';
import lottie from 'lottie-web';

import Url from './js/url';
import Event from "./js/event";
import Content from "./js/content";
import Enum from 'node-enumjs';

let Type = Enum.define("Type",
        {
            constants:
                {
                    raw: {},
                    message: {"text": "text" },
                    lottie: {"path": "path", "loop":"loop", "speed":1},
                    sound: {"path": "path"}
                }
        }
    );

Object.assign(
    globalThis,{
        $: jquery,
        L: lottie,
        C: Content,
        u: new Url(),
        E: Event,
        T: Type
    });
$(document).ready(function () {
    console.log(u.data);
    let c = new Content();
    c.type = "message";
    console.log(c);

    // u.string = 'yay';
    // let c = new Core();
    // console.log(c);
    Lottie.getEmAll().then(function (res){
        // console.log(res);
        Object.keys(res).forEach(function ($key, index, array)
        {
            let model = new Lottie(res[$key]);
            console.log(model);

            Lottie.build(model).then(function (res)
            {
                console.log(res);
            });
        });
    })
});

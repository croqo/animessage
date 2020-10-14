'use strict';

import Core from "./core-jquery";
import $ from "jquery";
import lottie from "lottie-web";

let defaults = {
    id: 'none',
    path: 'none',
    auto: true,
    loop: false,
    speed: 1.01,
    container: $('figure.lottie-player')
}
'use strict'
export default class Lottie
{
    constructor(Obj=defaults) {
        for (const [key, value] of Object.entries(Obj))
        {
            Object.defineProperty(
                this,
                key,
                {
                    value: value,
                    writable: true,
                    enumerable: true
                });
        }
        console.log(this);
    }

    static async getEmAll() {
        let result = [];
        Core.getConfig().then(function (config)
            {
                $('.lottie-player').each(function(index){
                    // console.log(this);
                    let player = this,
                        id = player.id,
                        c = config[id];

                    c.id = id;
                    c.container = player;
                    result[id] = new Lottie(c);
                });
            }
        );
        return result;
    }
    static async getFromContainer(container)
    {
        let id = container.id;
        let c = Core.getConfig().then(function (cfg)
        {
            let r = new Lottie(c);
                r.id = id;
                r.container = container;
            return r
        });
    }
    static async build(model)
    {
        let r = lottie.loadAnimation({
            path: model.path | false,
            container: model.container,
            renderer: 'svg',
            loop: !!model.loop,
            autoplay: !!model.auto,
            rendererSettings: {
                progressiveLoad: true,
                preserveAspectRatio: 'xMidYMid slice'
            }
        });
        $(model.container).on('DOMLoaded', function ()
        {
            r.setSpeed(model.speed);
        });
        return r;
    }
}
'use strict';

import Core from "./core-jquery";
import $ from "jquery";

let defaults = {
    id: 'none',
    path: 'x',
    auto: true,
    loop: false,
    speed: 1.01
}


export default class Lottie
{
    constructor(Obj=Object) {
        this.id = (!!Obj.id) ?  Obj.id : defaults.id;
        this.path = (!!Obj.path) ? Obj.path : defaults.path;
        this.auto = (!!Obj.auto) ? Obj.auto : defaults.auto;
        this.loop = (!!Obj.loop) ? Obj.loop : defaults.loop;
        this.speed = (!!Obj.speed) ? Obj.speed : defaults.speed;
    }
    static async getEmAll() {
        let result = [];
        Core.getConfig().then(function (config)
            {
                $('.lottie-player').each(function(index){
                    let player = $('.lottie-player').get(index);
                    let id = player.getAttribute('id');
                    let c = config[id];
                    c.id = id;
                    result[id] = new Lottie(c);
                });
            }
        );
        return result;
    }

}
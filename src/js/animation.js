import $ from "jquery";
import Core from "./core-jquery";
import lottie from 'lottie-web';

export default class Animation
{
    constructor() {
        this.lotties = Animation.getLotties();
    }
    static getLotties() {
        let result = [];
        $('.lottie-player').each(function(index){
            let player = $('.lottie-player').get(index);
            let id = player.getAttribute('id');
            result[id] = Animation.getLottie(id);
        });
        console.log(result);
        return result;
    }

    static getLottie(id) {
        let c = Core.getConfig();
        let config = c[id];
        let container = document.getElementById(id);
        let result = lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: !!config.loop,
                autoplay: true,
                path: config.url,
                rendererSettings: {
                    progressiveLoad: true,
                    preserveAspectRatio: 'xMidYMid slice'
                }
            }
        );
        result.setSpeed(config.speed);
        return result;
    }
    static resetLottie(id) {
        let a = Animation.getLotties();
        if (!!a[id]){
            a[id].destroy();
        }
        a[id] = Animation.getLottie(id);

    }
    static attachLotties(selector) {
        Object.keys(Animation).forEach(function (item){
            attachLottie(item, selector);
        });
    }
    static attachLottie(id, selector) {
        $(`#${id}`).appendTo(`${selector} [data-animation="${id}"]`);
    }

}
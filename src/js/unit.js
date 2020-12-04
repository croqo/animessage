/**
 * @property name string
 * @property container
 * @property lottie
 * @property audio
 * @property type
 * @property delay
 * @property text
 * @property speed
 * @property scaling
 */
import Lottie from "lottie-web";

export default class Unit
{
    constructor(code, data) {
        this.data = data;
        this.name = code;
        this.container = $(`<div class="${this.name}"></div>`).append(data.html);
        this.lottie = this.getLottieJson(data.lottie);
        this.anima = this.getLottie(data);
        this.sound = (!!data.audio) ?this.getSound(data.audio.toString()) :false;
        this.type = (!!data.type) ?`lottie-player ${data.type.toString()} z-hide` : "";
        this.delay = (!!data.delay) ?data.delay :50;
        this.text = (!!data.text) ?this.setMessageText(data.text.toString()) :"";
        this.speed = (!!data.speed) ?data.speed :1;
        this.scaling = (!!data.scaling);
        let res = $.Deferred();
        if (data.lottie){
            $.getJSON(data.lottie.toString(), function (data){
                res.resolve(data)
            })
        } else {
            res.reject(false)
        }
        res.done((data)=>{
            this.lottie = data;
        });
    }
    setContainer(data){
        if (data.text) {
            let text = data.text.toString();
            data.text = this.setMessageText(text)
        }
        return $(`${data.text}<figure class="${id}"></figure>`)
    }
    setMessageText(text){
        const type = "message box";
        return `<div class="${type}"><p>${text}</p></div>`
    }
    getSound(path){
        return new Howl({
            src: [path.toString()],
            html5: true,
            preload: 'auto'
        })
    }
    getLottie(data){
        let
            def = $.Deferred(),
            html = $(`<figure class="${data.type}"></figure>`),
            anim = Lottie.loadAnimation({
            container: $(data.container).append(`<figure class="${data.type}"></figure>`),
            animationData: this.getLottieJson(data.lottie)
        });
        return anim;
    }
    getLottieJson(path){
        let res = $.Deferred();
        if (path){
            $.getJSON(path.toString(), function (data){
                res.resolve(data)
            })
        } else {
            res.reject(false)
        }
        res.done((data)=>{
            return data;
        });
    }
}
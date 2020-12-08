/**
 * @property name string
 * @property html
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
        // this.data = data;
        this.name = code;
        this.init(data);
        // this.anima = this.getLottie(data);
        // let res = $.Deferred();
        // if (data.lottie){
        //     $.getJSON(data.lottie.toString(), function (data){
        //         res.resolve(data)
        //     })
        // } else {
        //     res.reject(false)
        // }
        // res.done((data)=>{
        //     this.lottie = data;
        // });
    };
    init(data){
        this.sound = (data.audio) ?this.getSound(data.audio.toString()) :false;
        this.type = (!!data.type) ?`lottie-player ${data.type.toString()} z-hide` : "";
        this.delay = (!!data.delay) ?data.delay :50;
        this.text = (!!data.text) ?this.setMessageText(data.text.toString()) :"";
        this.speed = (!!data.speed) ?data.speed :1;
        this.scaling = (!!data.scaling);
    }
    insert(container){
        let
            c = $(container).get(0),
            html = $(`<figure class="${this.type}"></figure>`);
        return $(html).appendTo(c).get(0)
    }
    setMessageText(text){
        const type = "message box";
        return `<div class="${type}"><p>${text}</p></div>`
    }
    getSound(path){
        return new Howl({
            src: [path.toString()],
            html5: true,
            preload: 'auto',
            onload: console.log(path.toString() + "is loaded")
        })
    }
    getLottie(data){
        let
            def = $.Deferred(),
            html = $(`<figure class="${data.type}"></figure>`);

        return Lottie.loadAnimation({
            container: $(`${data}`),
            animationData: this.getLottieJson(data.lottie)
        });
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
    static getLottieByPath(container, path){
        return Lottie.loadAnimation({
                container: container,
                path: path
            })
    }
}
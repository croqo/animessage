/**
 * @property id
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
import {Howl} from "howler";
import Html from "./html";
import Template from "./template";

export default class Unit
{
    constructor(id, data) {
        this.id = id;
        this.ready = $.Deferred();
        setTimeout(()=>{
            this.init(data);
        })
    };
    init(data){
        $.when(
            // sound only
            this.audio = (!!data.audio) ?data.audio.toString() :"",

            //lottie only
            this.scaling = (!!data.scaling),
            this.lottie = (!!data.lottie) ?data.lottie.toString() :"",

            // common
            this.delay = data.delay ?? 50,
            this.speed = data.speed ?? 1,

            //view
            this.type = (!!data.type)
                ?`lottie-player ${data.type.toString()} z-hide`
                : ""
            ,
            this.message = (!!data.text)
                ?this.setMessageText(data.text.toString())
                :""

        ).then(()=>{
            $.when(
                this.getLottieJson(this.lottie).done((data)=>{
                    this.animationData = data;
                    setTimeout(()=>{
                        console.log(`${this.id} animation is ready`)
                    })
                }),
                this.getSound(this.audio).done((sound)=>{
                    this.sound = sound;
                    setTimeout(()=>{
                        console.log(`${this.id} sound is ready`)
                    })
                })    
            ).then(()=>{
                this.ready.resolve();
                console.log(`${this.id} loading complete`);
            })
        })
    }
    setMessageText(text){
        const type = "message box";
        return `<div class="${type}"><p>${text}</p></div>`
    }
    getSound(path){
        let df = $.Deferred();
        if (path) {
            let ho = new Howl({
                src: [path.toString()],
                html5: true,
                preload: 'auto',
                onload: ()=>{
                    df.resolve(ho);
                }
            })
        } else {
            df.reject(false)
        }
        return df.promise();
    }

    /**
     * @param data :Unit
     */
    getLottie(data) {
        let html = Html.containerCreate("figure", {});
        setTimeout(()=>{
            let res = Lottie.loadAnimation({
                container: html,
                autoplay: false,
                loop: data.loop,
                animationData: data.lottie,
                rendererSettings: {
                    filterSize: {
                        width: '200%',
                        height: '200%',
                        x: '-50%',
                        y: '-50%',
                    },
                    preserveAspectRatio: (data.scaling) ?'xMidYMid meet' :'xMidYMid slice'
                }
            });
            res.addEventListener("DOMLoaded", function (){
                console.log(`${this.name} animation loaded...`)
            });
            return res
        })
    }
    getLottieJson(path){
        let res = $.Deferred();
        if (path){
            $.getJSON(path.toString(), function (data){
                res.resolve(data)
            })
        } else {
            res.reject()
        }
        return res.promise();
    }
    append(id){
        let tag = document.createElement("unit");
        tag.id = id;
        return this.node.appendChild(tag)
    }
}
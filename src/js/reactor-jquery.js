import $ from 'jquery';
import Animation from './animation';


export default class Reactor
{
    static space(switchTo)
    {
        switch (switchTo)
        {
            case 'config':
                $("#home-panel").addClass('is-hidden');
                $("#config-panel").removeClass('is-hidden');
                break;

            case 'home':
                $("#home-panel").removeClass('is-hidden');
                $("#config-panel").addClass('is-hidden');
                break;
        }
    }
    static updateAsset(id) {
        let a = Animation.getLotties();
    if (!!a[id]){
        resetLottie(id);
    }
    if (id==="message"){
        $("#message-text").text(Config["message"]["text"]);
    }
    if (id==="sound"){
        soundLoad();
    }
}}

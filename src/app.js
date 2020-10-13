import $ from 'jquery';
window.$ = window.jQuery = $;

import lottie from 'lottie-web';
window.lottie = lottie;


let Sound;
let Animation;
window.a = {};
import Core from './js/core-jquery';
import Reactor from './js/reactor-jquery';
window.a.Reactor = Reactor;
import Route from './js/route';
import Clipboard from './js/clipboard';

$(document).ready(function () {
    let Url = Route.new();
    let c = new Core();
    setTimeout(function ()
    {
        console.log(c);
    },1000);


    // if (Url.search!==""){
    //   a.Route.set(`#${btoa(Url.search)}`);
    // }

    // init();
});

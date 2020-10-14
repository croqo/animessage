import $ from 'jquery';
window.$ = window.jQuery = $;

import lottie from 'lottie-web';
window.lottie = lottie;


// let Sound;
window.a = {};
import Core from './js/core-jquery';
import Reactor from './js/reactor-jquery';
window.a.Reactor = Reactor;
import Route from './js/route';
// import Animation from './js/animation';
import Lottie from './js/lottie';
// import Clipboard from './js/clipboard';

$(document).ready(function () {
    // let Url = Route.new();
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

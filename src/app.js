import jquery from 'jquery';
import lottie from 'lottie-web';

import Href from './js/href';
import {Event, Tic, Tok} from "./js/event";

import Data from "./js/data";
import Enum from 'node-enumjs';
import Player from "./js/player";
import Config from "./js/config";
import Form from "./js/form";

// let Type = Enum.define("Type",
//         {
//             constants:
//                 {
//                     raw: {},
//                     message: {"text": "text" },
//                     lottie: lottie
//                 }
//         }
//     );

Object.assign(
    globalThis,{
        $: jquery,
        lottie: lottie,
        xDat:   new Data(),
        xTyp:   Enum,
        xCfg:   Config,
        xUrl:   new Href(),
        xEvt:   Event
    });

$(document).ready(function () {
//     Object.assign(
//         globalThis,{
// });
    xCfg.getEm().then(function (forms)
        {
            // console.log(x.Data);
            xDat.merge(forms);
            xUrl.get()
                .then(query =>
            {
                xDat.merge(query);
            });
        });

    console.log(xDat.export());
    // Lottie.getEmAll().then(function (res){
    //     // console.log(res);
    //     Object.keys(res).forEach(function ($key, index, array)
    //     {
    //         let model = new Lottie(res[$key]);
    //         console.log(model);
    //
    //         Lottie.build(model).then(function (res)
    //         {
    //             console.log(res);
    //         });
    //     });
    // })
});

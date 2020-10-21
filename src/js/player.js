import {Howl} from 'howler';
import $ from "jquery";

export default class Player extends Map
{
    /**
     *
     * @param {Map} data
     */
    constructor(data=new Map([])) {
        super(data);
        Object.defineProperties(
            this, {
                "audio": { value: data.get("audio") },
                "container": {value: data.get("container")},
                "renderer": {value: "svg"},
                "loop": {value: !!data.get("loop") },
                "path": {value: data.get("path") },
                "speed": { value: data.has("speed") ? data.get("speed") : 1.0 }
            }
        );
    }
    static selector() { return ".lottie-player"; }
    get audioFactory()
    {
        return new Howl({
            src: [ this.get("audio") ] // array of src
        });
    }
    set audioFactory(path) { this.set("audio", path) }

    set container(selector) { this.set("selector", selector) }
    get container() { return $(this.get("selector")).get(0) }

    set loop(bool) { this.set("loop", (!!bool) )  }
    get loop() { return this.get("loop")  }

    set path(pathToJson) { this.set("path", pathToJson) }
    get path() { return this.get("path") }

    set speed(value) { this.set("speed", value) }
    get speed() { return this.get("speed") }

    /**
     *
     * @param {Player} params
     * @return {AnimationItem}
     */
    static new(params)
    {
        let player =
        lottie.loadAnimation(params);
        $(params.container).on("DOMLoaded", function (event)
        {
            player.setSpeed(params.speed);
        });

    }
}
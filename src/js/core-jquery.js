import $ from 'jquery';
import Route from "./url";


export default class Core
{
    constructor() {
        this.array = Core.getConfig();
        this.url = new Route();
        this.setFormsFromUrl();
    }

    static getConfig() {
        let result = {};
        $("form").each(function (index) {
            let form = $("form").get(index);
            let id = Core.getFormId(form);
            result[id] = Core.getForm(form);
        });
        console.log(result);

        // setFormsFromUrl(Url.searchParams);
        return result;
    }
    get config()
    {
        return this.array;
    }
    set config(configEntry)
    {
        let id = configEntry.id;
        let key = configEntry.key;
        let value = configEntry.value;
        this.array[id][key] = value;
    }
    get route()
    {
        return this.url;
    }
    assign(id, key, value) {
        this.array[id][key] = value;
        this.url.searchParams.set(`${id}_${key}`, value);
        this.url.model = this.url.search;
        // replaceUrl(`${Url.search}`);
    }
    static configEntry(id, key, value)
    {
        return new Object({
            id: id,
            key: key,
            value: value
        });
    }
    setFormsFromUrl(){
        let url = Route.new();
        // console.log(this.url);
        url.searchParams.forEach(function(value, key) {
            console.log(key, value);
            let a = key.split("_");
            let selector = `form[data-target="${a[0]}"]`;
            switch (a[1]) {
                case 'loop':
                    $(selector + ' [name="loop"]').attr('checked', value !== "false");
                    break;
                default:
                    $(`${selector} [name="${a[1]}"]`).val(value);

            }
        });
    }

    static getFormId(item) {
    return $(item).closest('form').data('target');
}
    static getForm(form) {
    let result = [];
    let data = $(form).serializeArray();
    data.forEach(function(item) {
        let value;
        switch (item["name"]) {
            case "loop":
                value = item["value"] === "on";
                break;
            default:
                value = item["value"];
        }
        result[item["name"]] = value;
    });
    return result;
}
    static getLotties() {
    let result = [];
    $('.lottie-player').each(function(index){
        let player = $('.lottie-player').get(index);
        let id = player.getAttribute('id');
        result[id] = Core.getLottie(id);
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
    if (!!Animation[id]){
        Animation[id].destroy();
    }
    Animation[id] = getLottie(id);
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

let Url = getUrl();
if (Url.hash!==""){
    window.history.replaceState(
        "???",
        "woohoo!",
        `${Url.pathname}${atob(Url.hash.slice(1))}`
    );
}

let Config = getConfig();
console.log(Config);
let Animation = getLotties();
console.log(Animation);

let Sound = getSound();
soundLoad();

// Object.keys(Config).forEach(function (item) {
//     Object.keys(Config[item]).forEach(function (key) {
//         console.log(item+'_'+key+': '+Config[item][key]);
//     });
// });

$("input, select, textarea").on("change", function () {
    let id = getFormId(this);
    let name = $(this).attr("name");
    let value =
        $(this).val()==="on"
            ?$(this).prop("checked")
            :$(this).val()
    ;
    setConfig(id, name, value);
    updateAsset(id);
});


function getLotties() {
    let result = [];
    $('.lottie-player').each(function(index){
        let player = $('.lottie-player').get(index);
        let id = player.getAttribute('id');
        result[id] = getLottie(id);
    });
    return result;
}

function getLottie(id) {
    let config = Config[id];
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
    });
    result.setSpeed(config.speed);
    return result;
}
function resetLottie(id) {
    if (!!Animation[id]){
        Animation[id].destroy();
    }
    Animation[id] = getLottie(id);
}
function attachLotties(selector) {
    Object.keys(Animation).forEach(function (item){
        attachLottie(item, selector);
    });
}
function attachLottie(id, selector) {
    $(`#${id}`).appendTo(`${selector} [data-animation="${id}"]`);
}
function getConfig() {
    let result = [];
    setFormsFromUrl(Url.searchParams);
    $("form").each(function (index) {
        let form = $("form").get(index);
        let id = getFormId(form);
        result[id] = getForm(form);
    });
    return result;
}
function setConfig(id, key, value) {
    Config[id][key] = value;
    Url.searchParams.set(`${id}_${key}`, value);
    window.history.replaceState(
        `${id}_${key}: ${value}`,
        "woohoo!",
        `${Url.pathname}?${Url.searchParams}`
    );
}
function updateAsset(id) {
    if (!!Animation[id]){
        resetLottie(id);
    }
    if (id==="message"){
        $("#message-text").text(Config["message"]["text"]);
    }
    if (id==="sound"){
        soundLoad();
    }
}
function getFormId(item) {
    return $(item).closest("form").attr("data-target");
}

function getForm(form) {
    let result = {};
    let data = $(form).serializeArray();
    data.forEach(function(item) {
        let id = getFormId(item);
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
function getSound() {
    let s = $("#sound");
    return s[0];
}
function soundLoad() {
    $("#mp3").attr("src", Config["sound"]["mp3"]);
    Sound.pause();
    Sound.load();
}
function getUrl(){
    let href = window.location.href;
    return new URL(href);
}
function setFormsFromUrl(searchParams){
    for(let [name, value] of searchParams) {
        let a = name.split("_");
        let selector = `form[data-target="${a[0]}"]`;
        switch (a[1]) {
            case 'loop':
                $(selector+' [name="loop"]').attr('checked',value!=="false");
                break;
            default:
                $(`${selector} [name="${a[1]}"]`).val(value);
        }
    }
}

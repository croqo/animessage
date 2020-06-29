let Url;
let Sound;
let Config;
let Animation;

Url=getUrl();
if (Url.search!==""){
    replaceUrl(`#${btoa(Url.search)}`);
}

$(document).ready(function () {
    init();
});
$("input, select, textarea").on("change", function () {
    updateFormItem(this);
});

function init() {
    Config=getConfig();
    Animation=getLotties();
    Sound=getSound();
    soundLoad();
}

function tinyUrl() {
    let u = Url.origin + Url.pathname + Url.search;
    $.get(`https://tinyurl.com/api-create.php?url=${u}`, function(shorturl){
        $("#tinyurl-button").addClass("is-hidden");
        $("#tinyurl-result i").text(shorturl);
        $("#tinyurl-result").removeClass("is-hidden");
        console.log(shorturl);
    });
}
function copyToClipboard(element) {
    let $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}
function pasteFromClipboard(element) {
    navigator.clipboard.readText().then(
        clipText => {
            $(element).val(clipText);
            updateFormItem(element);
        });
}

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
function updateFormItem(element) {
    let id = getFormId(element);
    let name = $(element).attr("name");
    let value =
        $(element).val()==="on"
            ?$(element).prop("checked")
            :$(element).val()
    ;
    setConfig(id, name, value);
    updateAsset(id);
    $("#tinyurl-button").removeClass("is-hidden");
    $("#tinyurl-result").addClass("is-hidden");

}
function setConfig(id, key, value) {
    Config[id][key] = value;
    Url.searchParams.set(`${id}_${key}`, value);
    replaceUrl(`${Url.search}`);
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
    let u = new URL(href);
    if (u.hash!==""){
        return new URL(`${u.origin}${u.pathname}${atob(u.hash.slice(1))}${u.hash}`);
    }
    return u;
}
function replaceUrl(str) {
    window.history.replaceState(
        "",
        "",
        `${Url.pathname}${str}`
    );
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
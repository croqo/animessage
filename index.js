let Url = getUrl();
let Config = getConfig();
let Play = getLotties();
let Sound = soundGet();
soundLoad();

$("input, select, textarea").on("change", function (event) {
    let id = getFormTargetId(
        $(this).closest("form").get(0)
    );
    let name = $(this).attr("name");
    let value;
    switch (name) {
        case "loop":
            value = $(this).prop("checked");
            break;
        default:
            value = $(this).val();
    }
    Config[id][name] = value;
    Url.searchParams.set(`${id}_${name}`, value);
    window.history.replaceState(
        `${id}_${name}: ${value}`,
        "woohoo!",
        `${Url.pathname}?${Url.searchParams}`
    );
});
$("form button").on("click", function (event) {
    event.preventDefault();
    let id = getFormTargetId(
        $(this).closest("form").get(0)
    );
    reloadLottie(id);
    playLottie(id);
});
$("#config").on("click", function (event) {
    $(this).toggleClass("is-warning");
    $("#config-panel").slideToggle(200);
    $(".modal").fadeToggle(200);
    $(".modal-card").fadeToggle(200);
    $(".lottie-player").each(function () {
        $(this).fadeToggle(200);
    });
});

function startShow() {
    $('#config').fadeOut(200);
    $("#congratulation-text").text(Config["composition"]["text"]);
    $('.modal').fadeIn(200);
    soundPlay();
    playLottie("background");
    let d = Config["foreground"]["delay"];
    setTimeout(function () {
        playLottie("foreground");
        $('.modal-card').fadeIn(200);
    }, d );
    let t = Config["composition"]["duration"];
    soundStop(t);
    setTimeout(function () {
        $('.modal').fadeOut(200);
        $('.modal-card').fadeOut(200);
        $('#config').fadeIn(200);
    }, t );
}
function resetLottie(id) {
    reloadLottie(id);
    $("#"+id).fadeOut(0);
}
function playLottie(id) {
    resetLottie(id);
    $("#"+id).fadeIn(100);
    Play[id].goToAndPlay(0);
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
        autoplay: false,
        path: config.url,
        rendererSettings: {
            progressiveLoad: true,
            preserveAspectRatio: 'xMidYMid slice'
        }
    });
    result.setSpeed(config.speed);
    return result;
}
function reloadLottie(targetId) {
    Play[targetId].destroy();
    Play[targetId] = getLottie(targetId);
}

function getConfig() {
    let result = [];
    setFormsFromUrl(Url.searchParams);
    $("form").each(function (index) {
        let form = $("form").get(index);
        let id = getFormTargetId(form);
        result[id] = getForm(form);
    });
    return result;
}
function getFormTargetId(form) {
    return form.getAttribute('data-target');
}
function getForm(form) {
    let result = {};
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
function soundGet() {
    let s = $("#sound");
    return s[0];
}
function soundLoad() {
    $("#mp3").attr("src", Config["sound"]["mp3"]);
    Sound.pause();
    Sound.load();
}
function soundPlay() {
    Sound.volume = 0;
    Sound.play();
    $(Sound).animate({volume: 1.0}, parseInt(Config["sound"]["fadein"]));
}
function soundStop(duration=0) {
    let fadeOut = parseInt(Config["sound"]["fadeout"]);
    let t = (duration - fadeOut);
    setTimeout(function () {
        $(Sound).animate({volume: 0.1}, fadeOut)
    }, t);
    setTimeout( function () {
        Sound.pause();
        Sound.currentTime = 0;
    }, duration);
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
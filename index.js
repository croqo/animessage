
let Url = getUrl();

let Config = getConfig();
let Play = getLotties();
let Sound = getSound();
soundLoad();

// Object.keys(Config).forEach(function (item) {
//     Object.keys(Config[item]).forEach(function (key) {
//         console.log(item+'_'+key+': '+Config[item][key]);
//     });
// });

$("input, select, textarea").on("change", function (event) {
    // let this = event.target;
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
    setCongig(id);
    playLottie(id);
});
$("#config").on("click", function (event) {
    $(this).toggleClass("is-warning");
    $("#config-panel").slideToggle(200);
    $(".modal").fadeToggle(200);
    $(".lottie-player").each(function () {
        $(this).fadeToggle(200);
    });
});

function startShow() {
    Sound.play();
    $("#congratulation-text").text(Config["composition"]["text"]);
    $('.modal').fadeIn(200);
    Object.keys(Play).forEach(function (item){
        playLottie(item);
    });
    let t = Config["composition"]["duration"];
    setTimeout(function () {
        $('.modal').fadeOut(200);
        Sound.pause();
        Sound.currentTime = 0;
    }, t );
}
function resetLottie(id) {
    setCongig(id);
    $("#"+id).fadeOut(0);
}
function playLottie(id) {
    resetLottie(id);
    let delay = Config[id].delay | 0;
    setTimeout(function () {
        $("#"+id).fadeIn(100);
        Play[id].play();
    }, delay );
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
function setCongig(targetId) {
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
function getSound() {
    let s = $("#sound");
    return s[0];
}
function soundLoad() {
    $("#mp3").attr("src", Config["composition"]["sound"]);
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

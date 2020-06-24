
let Config = getConfig();
let Play = getLotties();
let Sound = getSound();
soundLoad(Config["composition"]["sound"]);

$("input, select, textarea").on("change", function (event) {
    let input = event.target;
    let id = $(input).closest("form").attr("data-target");
    let name = $(input).attr("name");
    switch (name) {
        case "loop":
            Config[id]["loop"] = $(input).prop("checked");
            break;

        default:
            Config[id][name] = $(input).val();
    }
});
$("form button").on("click", function (event) {
    event.preventDefault();
    let id = $(this).closest("form").attr("data-target");
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
    Object.keys(Play).forEach(function (item, index){
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
        loop: config.loop==="on"?true:false, //!=1?false:true,
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
    $("form").each(function (index) {
        let form = $("form").get(index);
        let id = form.getAttribute('data-target');
        result[id] = getForm(form);
    });
    return result;
}

function getForm(form) {
    let result = {};
    let data = $(form).serializeArray();
    data.forEach(function(item, index) {
        if (item["name"]){
            result[item["name"]] = item["value"];
        }
    });
    return result;
}
function getSound() {
    let s = $("#sound");
    return s[0];
}
function soundLoad(url) {
    $("#mp3").attr("src", url);
    Sound.pause();
    Sound.load();
}
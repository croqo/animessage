export default class Clipboard {
    static copy(from) {
        let $temp = $("<input>");
        $("body").append($temp);
        // let el = $(from).get(0);
        // console.log($(el).val());
        $temp.val($(from).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }
    static paste(to) {
        navigator.clipboard.readText()
        .then(clipText => {
            $(to).val(clipText);
            console.log('clipboard.paste: '+clipText);
        });
    }
}
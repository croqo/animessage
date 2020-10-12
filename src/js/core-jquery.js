import $ from "jquery";

export default class Core
{
    static async getConfig() {
    let result = [];
    // setFormsFromUrl(Url.searchParams);
    $("form").each(function () {
        // let form = $("form").get(index);
        let id = Core.getFormId(this);
        result[id] = Core.getForm(this);
    });
    return result;
}
    static setFormsFromUrl(searchParams){
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
    static getFormId(item) {
    return $(item).closest("form").attr("data-target");
}
    static getForm(form) {
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

}

export default class Template
{
    static appName(){return "aniMessage"}
    static appHtml(){
        return $(`#${Template.appName()}`).get(0)
            ?? $(`<div id="${Template.appName()}"></div>`).appendTo("body").get(0)
    }
    static setupHtml(id){
        return (
            $(Template.appHtml()).find(`div.setup.${id}`).get(0)
            ?? $(`<div class="setup ${id}"></div>`).appendTo(Template.appHtml()).get(0)
        )
    }
    static unitHtml(setup_html, unit_id){
        return (
            $(setup_html).find(`div.unit.${unit_id}`).get(0)
            ?? $(`<div class="unit ${unit_id}"></div>`).appendTo(setup_html).get(0)
        )
    }
}
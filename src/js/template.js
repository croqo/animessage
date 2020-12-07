export default class Template
{
    static appName(){return "aniMessage"}
    static appHtml(){
        return $(`#${Template.appName()}`).get(0)
            ?? $(`<div id="${Template.appName()}"></div>`).appendTo("body")
    }

}
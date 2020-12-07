export default class Setup
{
    constructor(code, parent=false) {
        this.name = code;
        this.array = [];

        let
            selector = (parent)
                ?parent
                :`#aniMessage`,
            html = `<div data-name="${this.name}" class="setup"></div>`
        ;
        this.html = $(html).appendTo(selector).get(0);
    }
    push(unit){
        unit.html(this.name);
        this.array.push(unit);
    }
}
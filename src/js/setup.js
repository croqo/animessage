import Unit from "./unit";
import Template from "./template";

/**
 * @property name
 * @property html
 * @property data
 */
export default class Setup
{
    constructor(code) {
        this.name = code;
        this.data = [];
        this.html = $(
            `<div data-name="${this.name}" class="setup"></div>`
        ).appendTo(Template.appHtml()).get(0);
    }
    getContent(content){
        let data = this.data ?? [];
        $.each(content, function (k, v){
            let
                unit = new Unit(k, v),
                container = $(this.html).get(0)
            ;
            unit.html = unit.insert(container);
            data.push(unit);
        });
    }
}
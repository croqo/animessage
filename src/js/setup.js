import Unit from "./unit";
import Template from "./template";

/**
 * @property name
 * @property html
 */
export default class Setup
{
    constructor(code) {
        this.name = code;
        this.array = [];
        this.html = $(
            `<div data-name="${this.name}" class="setup"></div>`
        ).appendTo(Template.appHtml()).get(0);
    }
    getContent(content){
        let res = [];
        $.each(content, function (k, v){
            let u = new Unit(k, v);
            u.html = u.insert($(this.html).get(0));
            res.push(u);
        });
        return res
    }
}
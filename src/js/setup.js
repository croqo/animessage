import Unit from "./unit";
import Html from "./html";
import Template from "./template";
import Container from "./view/container";
/**
 * @property name
 * @property container
 * @property content
 * @property player
 */
export default class Setup
{
    constructor(id, data) {
        this.id = `${Template.appName()}-${id}`;
        this.$ = Template.setupHtml(id);
        this.data = data;
    }
}
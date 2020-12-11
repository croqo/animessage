import Template from "./template";

export default class Html
{
    static separ() {    return "--" }
    static idCreate(id, parent_id){
        return `${parent_id}${Html.separ()}${id}`
    }
    static containerGet(id="") {
        let i = (id==="") ?Template.appName() :id,
            c = document.getElementById(i);
        if (c !== null) return c
    }
    static containerCreate(tag="div", attributes={}){
        let c = document.createElement(tag);
        $.each(attributes,(key, val)=>{
            c.setAttribute(key, val);
        });
        return c
    }
    static containerInsert(element, target){
        if (element.hasAttribute("id")){
            let id = element.getAttribute("id");
            element.setAttribute("id", Html.idCreate(id, target.getAttribute("id")))
        }
        return target.appendChild(element)
    }
    constructor(tag, attributes={}) {
        if (!attributes.id) attributes.id = Template.appName();
        this.node = new DocumentFragment();
        this.main = document.createElement("section");
        $.each(attributes,(key, val)=>{
            this.main.setAttribute(key, val);
        });
        this.node.appendChild(this.main);
        document.body.append(this.node);
    }
    get this(){
        return this.main
    }
    set setup([id,data]){
        let par = this.main,
            elem = document.createElement("div");
        elem.setAttribute("id", `${Template.appName()}${Html.separ()}${id}`);
        elem.setAttribute("class", "setup");
        par.appendChild(elem)
    }
    set unit([setup_id, unit_id]){
        let par = document.getElementById(setup_id),
            unit = document.createElement("div");
        unit.setAttribute("id", unit_id);
        par.appendChild(unit);
    }
}
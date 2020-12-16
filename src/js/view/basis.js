import Html from "../html";

export default class Basis
{
    constructor(tag, attributes){
        let 
        html = Html.containerCreate(tag, attributes),
        parent = Html.containerGet();
        this.html = Html.containerInsert(html, parent);
    }
}
import Setup from "./setup";
import Template from "./template";
import Html from "./html";

export default class Factory
{
    constructor(config) {
        this.setup = [];
        $.each(config, (k,v)=>{
            let id = Html.idCreate(k,Template.appName());
            setTimeout(()=>{
                let it = new Setup(id, v);
                console.log(it)
            })
        })
    }
}
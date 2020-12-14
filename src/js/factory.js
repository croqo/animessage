import Setup from "./setup";
import Template from "./template";
import Html from "./html";

export default class Factory
{
    constructor(config) {
        this.setup = [];
        setTimeout(()=>{
            $.each(config, (k,v)=>{
                let id = Html.idCreate(k,Template.appName());
                setTimeout(()=>{
                    this.setup.push(    new Setup(id, v)    )
                })
            });
            setTimeout(()=>{
                console.log("Factory setup ready")
            })
        })
    }
}
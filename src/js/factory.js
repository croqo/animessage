import Setup from "./setup";
import Template from "./template";
import Html from "./html";

export default class Factory
{
    constructor(config) {
        this.setup = [];
        this.container = Template.appHtml();
        setTimeout(()=>{
            $.each(config, (id,v)=>{
                let setup = new Setup(id, v);
                setTimeout(()=>{
                    this.setup.push(setup)
                })
            })
        })
    }
}
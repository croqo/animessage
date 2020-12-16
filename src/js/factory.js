import Setup from "./setup";
import Template from "./template";
import Html from "./html";
import Unit from "./unit";

export default class Factory
{
    constructor(config) {
        this.id = Template.appName();
        this.setup = {};
        this.$ = Template.appHtml();
        setTimeout(()=>{
            $.each(config, (id,v)=>{
                let name = `${this.id}-${id}`,
                com = new Setup(id, v);
                $.each(com.data, (key, val)=>{
                    let uni = new Unit(`${this.id}-${id}-${key}`, val);
                    uni.ready.done(()=>{
                        console.log(key, uni);
                        console.log(`${name} : Loading complete`);
                    })
                });

                this.setup[id];

                setTimeout(()=>{
                    console.log(`${name} : Processing start`);
                });
            });
            setTimeout(()=>{
                console.log(this);
            })
            
        })
    }
    play(code){

    }
}
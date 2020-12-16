import Unit from "./unit";
import Html from "./html";
import Template from "./template";
/**
 * @property name
 * @property container
 * @property content
 * @property player
 */
export default class Setup
{
    constructor(id, data) {
         this.id = this.container = id;

        setTimeout(()=>{
            this.content = data ?? [];
        })
    }
    set content(content){
        let
            id = this.id, html = this.container,
            ar = [], unit
        ;
        $.each(content, function (key, val){
            let df_id = $.Deferred();
            df_id.resolve(
                Html.idCreate(key, id)
                );
            df_id.done((unit_id)=>{
                unit = new Unit(unit_id, val);
                setTimeout(() => {
                    this.container = unit_id;
                    ar.push(unit);
                });
            })
        });
        setTimeout(() => {
            console.log(unit);
            return ar
        });
    }
    get container(){
        return document.getElementById(this.id)
    }
    set container(id){
        let res = new DocumentFragment(),
        el = document.createElement("message");
        el.id = id;
        res.appendChild(el);
        return document.body.appendChild(res);
    }
    static from(config){
        let res = [];
        setTimeout(()=>{
            $.each(config, (k,v)=>{
                Html.idCreate(k,Template.appName())
                .done((id_gen)=>{
                    setTimeout(()=>{
                        setTimeout(()=>{
                            res.push(    new Setup(id_gen, v)    )
                        })
                    })
                })
            });
            setTimeout(()=>{
                console.log(this);
            })
        });
        return res
    }
}
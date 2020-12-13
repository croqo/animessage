import Unit from "./unit";
import Html from "./html";

/**
 * @property name
 * @property container
 * @property content
 */
export default class Setup
{
    constructor(id, data) {
        this.id = id;
        setTimeout(()=>{
            this.content = data ?? [];
        })
    }
    set content(content){
        let
            id = this.id,
            ar = []
        ;
        $.each(content, function (key, val){
            let df_id = $.Deferred();
            df_id.resolve(Html.idCreate(key, id));
            df_id.done((unit_id)=>{
                let unit = new Unit(unit_id, val);
                ar.push(unit);
                console.log(unit)
            })
        });
        return ar
    }
    get container(){
        return Html.containerGet(this.id)
    }
    set container(data){
        let
            pa = Html.containerGet(),
            id = Html.idCreate(this.id, p.id),
            co = Html.containerCreate("div",{
                "id": id,
                "class": "setup"
            })
        ;
        setTimeout(()=>{
            pa.appendChild(co)
        })
    }
}
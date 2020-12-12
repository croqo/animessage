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
}
import Unit from "./unit";
import Html from "./html";

/**
 * @property name
 * @property html
 * @property data
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
            id = this.id
        ;
        $.each(content, function (key, val){
            let df = $.Deferred();
            df.resolve(Html.idCreate(key, id));
            df.done((unit_id)=>{
                let unit = new Unit(unit_id, val);
                console.log(unit)
            })
        });
    }
}
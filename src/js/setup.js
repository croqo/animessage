import Unit from "./unit";
import Html from "./html";
import Template from "./template";
import Container from "./view/container";
/**
 * @property name
 * @property container
 * @property content
 * @property player
 */
export default class Setup
{
    constructor(id, data) {
        this.id = id;
        this.$ = Template.setupHtml(id);
         setTimeout(()=>{
            this.content = this.getData(data);
        })
    }
    getData(data){
        let res = [], this_id = this.id;
        $.each(data, (key, val)=>{
            let unit = new Unit(key, val);
            unit.$ = Template.unitHtml(this_id, key);
            setTimeout(()=>{
                res.push(unit) 
            })
        });
        return res
    }
}
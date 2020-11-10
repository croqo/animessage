import $ from "jquery";
import Form from "./form-jquery";

export default class Config
{
    constructor() {
        Config.getForms().then(function (f)
        {
           console.log(f);
        });
    }
    get(){return this}
    set(key, val)
    {
        Object.defineProperty(
            this,
            key,
            {
                value: val,
                configurable: true
            });
        return true
    }

    static async getForms() {
        let result = [];
        $(Form.default()).each(function()
        {
            // this - every form element
            console.log(this);
            result.push(new Form(this));
        });
        return result;
    }
}
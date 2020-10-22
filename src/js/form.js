import Model from "./model";
import $ from "jquery";
import Data from "./data";

export default class Form extends Model
{
    static selector(id='')
    {
        return (id==='')
            ?'form'
            :`form[data-id="${id}"]`
    };

    constructor(form) {
        console.log(form);
        super(
            Object.assign(
                Form.serialize(form)
            )
        );
    }

    get selector()
    {
        return Form.selector(this.id);
    }

    static serialize(form)
    {
        let array = $(form).serializeArray();
        let result = new Map();
        $.each(array, function (i){
            // console.log(array);
            let item = array[i];
            let value;
            switch (item["name"]) {
                case "loop":
                    value = item["value"] === "on";
                    break;
                default:
                    value = item["value"];
            }
            result.set(item["name"], item["value"]);//[item["name"]] = value;
        });
        return result;
    }

    static async getEm() {
        let result = new Map();
        $(Form.selector()).each(function()
        {
            // this - every form element
            let id = Form.getFormId(this);
            $(Form.serialize(this)).each(function ()
            {
                // this - every element property Map([key, value])
                // console.log(this);
                result.set(
                    id,
                    this
                );
            });
        });
        return result;
    }

    static getFormId(item) {
        return $(item).closest(Form.selector()).data('id');
    }
    static updateFormItem(element) {
        let id = Form.getFormId(element);
        let name = $(element).attr("name");
        let value =
            $(element).val()==="on"
                ?$(element).prop("checked")
                :$(element).val()
        ;
        // setConfig(id, name, value);
        // updateAsset(id);
        // $("#tinyurl-button").removeClass("is-hidden");
        // $("#tinyurl-result").addClass("is-hidden");
    }

}
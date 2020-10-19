import Model from "./model";
import $ from "jquery";

export default class Form extends Model
{
    static selector(id='')
    {
        return (id==='')
            ?'form'
            :`form[data-id="${id}"]`
    };

    constructor(form) {
        super(
            Object.assign(
                $(form).data(),
                Form.serialize(form)
            )
        );
        this.add('id', Form.getFormId(form));
    }

    get selector()
    {
        return Form.selector(this.id);
    }

    static serialize(form)
    {
        let array = $(form).serializeArray();
        let result = [];
        $.each(array, function (i){
            console.log();
            let item = array[i];
            let value;
            switch (item["name"]) {
                case "loop":
                    value = item["value"] === "on";
                    break;
                default:
                    value = item["value"];
            }
            result[item["name"]] = value;
        });
        return result;
    }

    static async getEm() {
        let result = [];
        $(Form.selector()).each(function()
        {
            // this - every form element
            let form = new Form(this);
            result[form.id] = form;
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
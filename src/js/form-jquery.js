import Model from "./model";
import $ from "jquery";

export default class Form extends Model
{
    static default(){return 'form'};

    constructor(form) {
        super(
            Object.assign(
                $(form).data(),
                Form.serialize(form)
            )
        );
    }

    get selector()
    {
        return (typeof id.toString() === 'string' && id !== Form.default())
            ? `form[data-target="${this.id}"]`
            : Form.default();
    }

    get id(){
        return this.target;
    };

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

    static async getForm(form) {
        return new Form(form);
    }


}
import Model from "./model";
import $ from "jquery";

export default class Form extends Model
{
    static default(){return 'form'};

    constructor(form) {
        let data = Object.assign(
            $(form).data(),
            $(form).serializeArray()[0]
        );
        super(data);
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
}
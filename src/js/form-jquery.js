import Model from "./model";

export default class Form extends Model
{
    set selector(id)
    {
        return `form[data-target="${id}"]`;
    }
}
export default class Content extends Map
{
    set type(t)
    {
       this.set("type", T[t]);
    }
    get type()
    {
        return this.get("type").name();
    }
}
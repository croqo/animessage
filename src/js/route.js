export default class Route
{
    constructor() {
        this.url = Route.new();
    }
    static new()
    {
        let href = window.location.href;
        return new URL(href);
    }
    get model()
    {
        if (typeof (this.url) != 'undefined' && this.url !== null)
        {
            return this.url;
        }
        return Route.new;
        // let u = Route.new();
        // if (u.hash!==""){
        //     return new URL(`${u.origin}${u.pathname}${Route.decode(u.hash)}${u.hash}`);
        // }
        // return u;
    }
    set model(str)
    {
        window.history.replaceState(
            "",
            "",
            `${this.url.pathname}${str}`
        );
        this.url = Route.new();
    }
    // static hash()
    // {
    //     let str = Route.get().search.toString();
    //     this.set(`#${btoa(str)}`);
    // }
    // static query() {
    //     let u = this.get();
    //     if (u.hash.slice(1) !== '')
    //     {
    //         u.search = atob(u.hash.slice(1));
    //     }
    // }
    static encode(queryString)
    {
        let r = `#${btoa(queryString)}`
        return r;
    }
    static decode(hashString)
    {
        let r = atob(hashString.slice(1));
        return r;
    }
    tinyUrl() {
        let share = this.url.origin + this.url.pathname + this.url.search;
        $.get(`https://tinyurl.com/api-create.php?url=${share}`, function(shorturl){
            $("#tinyurl-button").addClass("is-hidden");
            $("#tinyurl-result i").text(shorturl);
            $("#tinyurl-result").removeClass("is-hidden");
            console.log(shorturl);
        });
    }
}
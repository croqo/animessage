export default class Url
{
    static async now()
    {
        return window.location.href;
    }
    constructor() {
        Object.defineProperty(
            this,
            'api',
            {
                value: new URL(window.location.href),
                configurable: false,
                enumerable: false,
                writable: false
            });
    }
    get data()
    {
        let result = [];
        this.api.searchParams.forEach(
            (val, key) => {
                let t = key.split('_');
                let id = t[0];
                let option = [t[1], val];

                result[id] = (id in result)
                    ? result[id].concat([option])
                    : [option];
                ;
            }
        );
        return result; // array[id][key, value]

    }
    static encode(queryString)
    {
        return `#${btoa(queryString)}`;
    }
    static decode(hashString)
    {
        return atob(hashString.slice(1));
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
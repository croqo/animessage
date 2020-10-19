import Model from "./model";

export default class Url
{
    static async now()
    {
        return window.location.href;
    }
    static split(key)
    {
        return key.split('_'); // array[0]: id, array[1]: property
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
                let k = Url.split(key);
                let id = k[0];
                let prop = k[1];

                result[id] = (id in result)
                    ? result[id]
                    : new Model({id: id});
                result[id].add(prop, val);
            }
        );
        return result; // array[id]{property, value}

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
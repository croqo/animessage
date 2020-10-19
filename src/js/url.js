import Model from "./model";

export default class Url
{
    static separator() { return '_' }
    /**
     * get actual href string
     * @returns {Promise<string>}
     */
    static async now()
    {
        return window.location.href;
    }

    /**
     * Split searchParams keys to parent_id, keys
     * @param {string} key
     * @returns {*|string[]}
     */
    static split(key)
    {
        return key.split(Url.separator()); // array[0]: id, array[1]: property
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

    /**
     * Collect data from searchParams
     * @returns {[]} array[id]{property, value}
     */
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
        return result;
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
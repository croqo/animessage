import Model from "./model";
import $ from "jquery";
import Event from "./event";

export default class Url
{
    static separator() { return '_' }

    /**
     * Split searchParams keys to parent_id, keys
     * @param {string} key
     * @returns {[]}
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
                value: new URL(window.location.href)
            });
        $(globalThis).trigger('url_api_ready');

        Object.defineProperty(
            this,
            'data',
            {
                enumerable: true,
                get() {
                    let result = new C();
                    this.api.searchParams.forEach(
                        (val, key) => {
                            let k = Url.split(key);
                            let id = k[0];
                            let prop = k[1];

                            result[id] = (id in result)
                                ? result[id]
                                : new C();
                            result[id].set(prop, val);
                        }
                    );
                    $(global).trigger('url_data_ready');
                    return result;
                }
            });
    }
    /**
     * Set searchParams with Model {keys, values}
     * @param {C} model
     */
    set data(model)
    {
        if (id in model)
        {
            Object.keys(model).forEach(key =>
            {
                if (key !== 'id')
                {
                    this.api.searchParams.append(
                        id + Url.separator + key,
                        model[key]
                    );
                }
            });
            this.replaceWith(
                this.api.searchParams.toString()
            ).then(function ()
                {
                    return true;
                });
        }
    }
    async replaceWith(str) {
      window.history.replaceState(
              "",
              "",
              `${this.api.pathname}${str}`
      );
    }
    get string()
    {
        return this.api.pathname + this.api.search + this.api.hash;
    }
    set string(str)
    {
        this.replaceWith(str).then(
            Event.trigger('url_change')
        );
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
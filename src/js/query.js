import Model from "./model";
import $ from "jquery";
import {Event} from "./event";
import Data from "./data";

export default class Query extends URL
{

    /**
     * Split searchParams keys to parent_id, keys
     * @param {string} key
     * @returns {[]}
     */
    static split(key)
    {
        return key.split(Data.separator()); // array[0]: id, array[1]: property
    }

    constructor() {
        let href = window.location.href;
        super(href);
    }
    async get()
    {
        return this.query
    }
    get query()
    {
        let result = {};
        this.searchParams.forEach(
            function (value, key, parent)
            {
                let i = Query.split(key);
                result[i[0]] = (i[0] in result) ? result[i[0]] : {};
                if (typeof i[1] === "undefined") i[1] = "default";

                // get JSON if found
                if (new RegExp(/\w.json$/).test(value)===true)
                {
                    $.getJSON(value,{},
                        function (json)
                        {   result[i[0]]["animationData"]= json    });
                    console.log("json: "+value)

                }
                result[i[0]][i[1]]=value;
            }
        );
        console.log(result);
        return result;
    }

    /**
     *
     * @param {$Keys,$Values} map
     */
    set query(map)
    {
        for (let key in map){
            if (map.hasOwnProperty(key))
            {
                this.searchParams.append(key, map[key]);
            }
            $(document).trigger("query");
        }
        this.string = this.search;
    }

    async replaceWith(str) {
      window.history.replaceState(
              "",
              "",
              `${this.pathname}${str}`
      );
    }
    set string(str)
    {
        this.replaceWith(str).then(function (){
            console.log("query updated: "+str);
        });
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
        let share = this.origin + this.pathname + this.search;
        $.get(`https://tinyurl.com/api-create.php?url=${share}`, function(shorturl){
            $("#tinyurl-button").addClass("is-hidden");
            $("#tinyurl-result i").text(shorturl);
            $("#tinyurl-result").removeClass("is-hidden");
            console.log(shorturl);
        });
    }
}
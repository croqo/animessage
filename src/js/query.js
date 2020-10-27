import $ from "jquery";
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
    static async get()
    {
        let q = new Query();
        return q.query;
    }
    get query()
    {
        let result = {};
        this.searchParams.forEach(
            function (value, key, parent)
            {
                let i = Query.split(key);
                let id = i[0];
                let prop = i[1];
                let v = {["name"]:id};

                result[id] = (id in result)
                    ? result[id]
                    : v
                ;

                if (typeof id === "undefined") { id = "default" }
                v = {[prop]: value};
                result[id] = {...result[id], ...v};
            });
        return {...result};
    }

                // get JSON if found
                // if (new RegExp(/\w.json$/).test(value)===true)
                // {
                //     $.getJSON(value,
                //         function (json)
                //         {
                //
                //
                //         }).done(function (json){
                //         v = {["animationData"]: json}
                //     });
                //     // v = {["path"]: value}
                //     // console.log(v);
                // }

                // get MP3 if found
                // else if (new RegExp(/\w.mp3$/).test(value)===true)
                // {
                //     v = { ["audioFactory"]: new Howl({ src: [value]  }    )};
                //     // $(document).trigger("audio_loaded", [i[0]], result);
                //     // console.log("mp3: "+value);
                //     // console.log(v);
                // }
                // {  v = {[prop]:value} }
                // console.log(v);

        // console.log(result);


    /**
     *
     * @param {$Keys,$Values} map
     */
    set query(map)
    {
        for (let key in map){
            if (map.hasOwnProperty(key))
            {
                if (key!=="name")
                {
                    this.searchParams.append(key, map[key]);
                }
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
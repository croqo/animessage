export default class Data
{
    static separator() { return "_" }

    constructor() {
        Object.defineProperty(
            this, "$",
            {
                value: new Map(),
                writable: true
            },
        );
    }
    // export data as Map
    get() {
        return this.$;
    }
    // import data
    set(data)
    {
        this.merge(data);
    }
    id(id)
    {
        if (! this.$.has(id) ) this.$.set(id, new Map());
        return this.$.get(id);
    }
    merge(data)
    {
        if (data instanceof Data)
        { data = data.get() }

        if (data instanceof Map)
        { data.forEach((
            (map, id) =>
            {
                // console.log(value, key);
                id = this.id(id);
                if (map instanceof Map)
                {
                    map.forEach((
                        (value, key) =>
                        {
                            id.set(key,value);
                        }));
                }
            }))}
    }
    import(id, key, val=false) {
        if (!val)
        {
            this.$.set(id, key);
        } else {
            let i = this.id(id);
            i.set(key, val);
        }
    }
}
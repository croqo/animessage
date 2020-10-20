export default class Data
{
    static separator() { return "_" }

    constructor() {
        Object.defineProperty(
            this, "$",
            {
                value: new Object({}),
                writable: true
            },
        );
    }
    merge(data)
    {
        if (data instanceof Data)
        { data = data.export() }

        for (let id in data)
        {
            if (data.hasOwnProperty(id))
            {
                for (let [k, v] of data[id])
                {
                    this.import(id, k, v);
                }
            }
        }
    }
    import(id, key, val=false) {
        this.$[id] = (id in this.$)
            ? this.$[id]
            : new Map();

        val ? this.$[id].set(key, val)
            : this.$[id] = key;
    }
    // export data as Object
    export() {
        return this.$;
    }
}
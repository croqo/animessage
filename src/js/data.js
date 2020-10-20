import Url from "./url";

export default class Data extends Map
{
    constructor() {
        super();
        Object.defineProperty(
            this, "bank",
            {
                value: new Map(),
                writable: true
            },
        );
    }
    merge(obj)
    {
        this.bank = Object.assign(
            obj, this.bank
        );
    }
    import(id, key, val=false) {
        this.bank[id] = (id in this.bank)
            ? this.bank[id]
            : new Map();

        val ? this.bank[id].set(key, val)
            : this.bank[id] = key;
    }

    // export data to url.searchParameters
    export() {
        let result = new Map();
        const it_1 = this.bank.keys();
        while (!it_1.done) {
            let id = it_1.next().value;
            const it_2 = this.bank[id].keys();
            while (!it_2.done) {
                let key = it_2.next().value;
                let val = this.bank[id][key];
                let url_key = id + Url.separator() + key;
                result.set(url_key, val);
            }
        }
        return result;
    }
}
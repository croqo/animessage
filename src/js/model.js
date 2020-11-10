'use strict'
export default class Model
{
    constructor(Obj)
    {
        if ($.isPlainObject(Obj))
        {
            for (const [key, value] of Object.entries(Obj))
            {
                this.add(key, value);
            }
        }
    }
    add(key, value)
    {
        Object.defineProperty(
            this,
            key,
            {
                value: value,
                configurable: true,
                enumerable: true
            });
    }
    static define(object, key, value)
    {
        Object.defineProperty(
            object,
            key,
            {
                value: value,
                configurable: true,
                enumerable: true
            });
    }
    unset(key)
    {
        if (key in this)
        {
            delete this[key];
        }
    }
}
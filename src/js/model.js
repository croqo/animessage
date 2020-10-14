'use strict'
export default class Model
{
    constructor(Obj) {
        for (const [key, value] of Object.entries(Obj))
        {
            Object.defineProperty(
                this,
                key,
                {
                    value: value,
                    writable: true,
                    enumerable: true
                });
        }
    }
}
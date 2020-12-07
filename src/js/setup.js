export default class Setup
{
    constructor(code) {
        this.name = code;
        this.array = []
    }
    inject(to){
        this.html =
        $(`<div class="setup-${this.name}"></div>`).appendTo($(to)).get(0);
    }
}
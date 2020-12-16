export default class Template
{
    static appName(){return "aniMessage"};
    static appHtml(){
        return $(`#${Template.appName()}`).get(0)
            ?? $(`<section id="${Template.appName()}"></section>`).appendTo("body").get(0)
    };
    static setupHtml(id){
        let 
        name = `${Template.appName()}-${id}`,
        tag = "div", 
        parent = $(Template.appHtml());

        return (
            $(`#${Template.appName()} ${tag}#${name}`).get(0)
            ?? $(`<${tag} id="${name}" class="media-set"></${tag}>`).appendTo(parent).get(0)
        )
    };
    static unitHtml(setup_id, unit_id){
        let
            name = `${Template.appName()}-${setup_id}-${unit_id}`,
            setup = Template.setupHtml(setup_id),
            tag = "div"
        ;
        setTimeout(()=>{
            return (
                $(`#${name}`).get(0)
                ?? $(`<${tag} id="${name}" class="media-unit"></${tag}>`).appendTo(setup).get(0)
            )
        })
    };
    static animationHtml(unit_html){
        let unit_id = $(unit_html).id,
            unit = $(`#${unit_id}`);
        return (
            unit.find("figure.animation").get(0)
            ?? $(`<figure class="animation"></figure>`).appendTo(unit).get(0)
        )
    };
    static container(id, parent){
        let res = document.getElementById(id);
        if (res===null) {
            let div = document.createElement("div");
            div.id = (!!parent.id) ?`${parent.id}__${id}` :id;
            res = parent.appendChild(div);
        }
        return res
    }
    static containerCreate(new_id, parent_id=""){
        let
            div = document.createElement("div"),
            parent = (parent_id==="") ?Template.appHtml() :document.getElementById(parent_id)
        ;
        div.id = (parent_id) ?`${parent_id}__${new_id}` :new_id;
        return parent.appendChild(div);
    }
}
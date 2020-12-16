export default class Container
{
    static containerGet(id="") {
        let i = (id==="") ?Template.appName() :id,
            c = document.getElementById(i);
        return (c !== null)
            ?c
            :false
    }
    static containerCreate(tag="div", attributes={}){
        let c = document.createElement(tag);
        $.each(attributes,(key, val)=>{
            c.setAttribute(key, val);
        });
        return c
    }
    static containerInsert(element, target){
        if (element.hasAttribute("id")){
            let id = element.getAttribute("id");
            element.setAttribute("id", Html.idCreate(id, target.getAttribute("id")))
        }
        return target.appendChild(element)
    }
}
import { BaseComponent } from "../base.component/base.component.js";
const baseComponent = new BaseComponent();

export class DropZoneComponent {
    constructor({interact,accept,text}){
        this.interact = interact;
        this.accept = accept || "draggable";
        this.text = text;
    }
    async render(container) {
        this.element = await baseComponent.renderTemplate({
            container,
            templatePath: "/components/dropzone.component/dropzone.component.html",
        });
        this.element.innerHTML = this.text;
        this.element.setAttribute('key',this.text);
        return this.element;
    }
    async setDropZones(accept=this.accept){
        this.interact('.dropzone').dropzone({
            accept: accept,
            listeners: {
                drop (event) {
                    const target = event.target;
                    const relatedTarget = event.relatedTarget;
                    
                    if(target.getAttribute("key")==relatedTarget.getAttribute("key")){
                        relatedTarget.classList.add("valid");
                        relatedTarget.classList.remove("invalid");
                        relatedTarget.classList.remove("neutral");
                    }
                    else{
                        relatedTarget.classList.add("invalid");
                        relatedTarget.classList.remove("neutral");
                        relatedTarget.classList.remove("valid");
                    }
                }
            }
        });
    }
}


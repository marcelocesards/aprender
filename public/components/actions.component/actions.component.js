import {  BaseComponent } from "../base.component/base.component.js";
const baseComponent = new BaseComponent();

export class ActionsComponent {
    constructor(){
    }

    async render(container){
        this.element = await baseComponent.renderTemplate({
            container,
            templatePath: "/components/actions.component/actions.component.html"
        });
        this.addEventListeners();
        return this.element;
    }
    addEventListeners(){
        this.element.querySelector(".btn-voltar").addEventListener("click",()=>{
            const data = {type: "select-mode",message: "start"};
            window.postMessage(JSON.stringify(data),window.location.href);
        })
    }
}
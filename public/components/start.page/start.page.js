import {  BaseComponent } from "../base.component/base.component.js";

const baseComponent = new BaseComponent();
export class StartPage {
    constructor(){

    }
    async render(container){
        this.element = await baseComponent.renderTemplate({
            container,
            templatePath: "/components/start.page/start.page.html"
        });
        
        this.addEventListeners();
        return this.element;
    }
    addEventListeners(){
        this.element.querySelectorAll(".button-container").forEach((button)=>{
            button.addEventListener("click",()=>this.startSelectedMode(button.getAttribute("data-mode")));
        })
    }
    
    /**
     * Envia uma mensagem para a aplicação solicitando a execução do modo selecionado
     */
     startSelectedMode(mode){
        const data = {type: "select-mode",message: mode};
        window.postMessage(JSON.stringify(data),window.location.href);
    }
}
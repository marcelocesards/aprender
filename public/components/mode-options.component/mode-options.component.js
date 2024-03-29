import {  BaseComponent } from "../base.component/base.component.js";
const baseComponent = new BaseComponent();
export class ModeOptionsComponent {
    constructor(){
    }

    async render(container){
        this.element = await baseComponent.renderTemplate({
            container,
            templatePath: "/components/mode-options.component/mode-options.component.html"
        });
        this.addEventListeners();
        return this.element;
    }
    addEventListeners(){
        this.element.addEventListener("change",()=>this.startSelectedMode());
    }
    /**
     * Envia uma mensagem para a aplicação solicitando a execução do modo selecionado
     */
    startSelectedMode(){
        const data = {type: "select-mode",message: this.element.value};
        window.postMessage(JSON.stringify(data),window.location.href);
    }
}
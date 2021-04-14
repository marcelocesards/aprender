import {  BaseComponent } from "../base.component/base.component.js";
import {LabelLetrasComponent} from "../label-letras.component/label.letras.component.js";
import {LabelEstatisticaComponent} from "../label-estatistica.component/label-estatistica.component.js";
import {CoresService} from "./cores.service.js";

const baseComponent = new BaseComponent();
const coresService = new CoresService();

const MESSAGE_END = 'Finalizado!';
export class CoresComponent {
    constructor(){
       this.clear();
       this.start();
    }
    async start(){
        this.lista = await coresService.get();
    }
    async restart(){
        this.clear();
        await this.start();
        this.LabelEstErr.innerHTML="";
        this.LabelEst.innerHTML="";
        this.carregar();
    }
    clear(){
        this.corretas=[];
        this.erradas=[];
    }

    async render(container){
        this.element = await baseComponent.renderTemplate({
            container,
            templatePath: "/components/cores.component/cores.component.html"
        });
        this.addEventListeners();
        this.labelLetrasComponent = new LabelLetrasComponent();
        this.label = await this.labelLetrasComponent.render(this.element);        
        let labelEstatistica = new LabelEstatisticaComponent();
        this.LabelEst = await labelEstatistica.render(this.element); 
        this.LabelEstErr = await labelEstatistica.render(this.element); 
        this.element.querySelector(".exibicaoLetras").appendChild(this.label);
        this.element.querySelector(".certas").appendChild(this.LabelEst);
        this.element.querySelector(".erradas").appendChild(this.LabelEstErr);
        this.carregar();
        return this.element;
    }

    addEventListeners(){
        this.element.querySelector('.btn-carregar').addEventListener('click', ()=>this.carregar());
        this.element.querySelector('.btn-certo').addEventListener('click', ()=>this.respostaCerta());
        this.element.querySelector('.btn-errado').addEventListener('click', ()=>this.respostaErrada());
        this.element.querySelector('.btn-limpar').addEventListener('click', ()=>this.restart());
    }

    carregar(){
        let content = this.getRandom();
        if(content === MESSAGE_END){
            this.label.innerHTML=MESSAGE_END;
            this.label.removeAttribute("style");
            this.label.classList.remove("labelLetras");
            this.label.classList.add("labelFinalizado");
        }
        else{
            this.label.classList.add("labelLetras");
            this.label.classList.remove("labelFinalizado");
            this.label.innerHTML=content.key.split("")[0];
            this.label.style = `color: ${content.value}; background-color: ${content.value};`;
        }
    }

    getRandom(){
       let index = Math.floor(Math.random() * this.lista.length);       
       while(index&&this.ultimoIndex===index){
            index = Math.floor(Math.random() * this.lista.length);
       }
       if(this.lista.length===0){
        return MESSAGE_END
       }
        
       this.ultimoIndex = index;
       return this.lista[index] 
    }

    respostaCerta(){
        if(this.lista.length===0)
            return;
        this.corretas.push(this.lista[this.ultimoIndex].key);
        this.lista.splice(this.ultimoIndex,1);
        this.LabelEst.innerHTML=`Corretas: ${this.corretas
            .sort((a,b)=>a>b?1:a<b?-1:0)    
            .join(', ')}`;
        this.carregar();
    }

    respostaErrada(){
        if(this.lista.length===0)
            return;
        if(this.erradas.includes(this.lista[this.ultimoIndex])){
            this.carregar();
            return;
        }
        this.erradas.push(this.lista[this.ultimoIndex].key);
        this.LabelEstErr.innerHTML=`Erradas: ${this.erradas
            .sort((a,b)=>a>b?1:a<b?-1:0)    
            .join(', ')}`;
        this.carregar();
    }
}


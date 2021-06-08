import {  BaseComponent } from "../base.component/base.component.js";
import {LabelLetrasComponent} from "../label-letras.component/label.letras.component.js";
import {LabelEstatisticaComponent} from "../label-estatistica.component/label-estatistica.component.js";
import {NumerosService} from "./numeros.service.js";
import {ActionsComponent} from "../actions.component/actions.component.js";

const baseComponent = new BaseComponent();
const numerosService = new NumerosService();

const MESSAGE_END = 'Parabéns!';
export class NumerosComponent {
    constructor(){
       this.clear();
       this.start();
    }
    async start(){
        this.listaLetras = await numerosService.get();
    }
    async restart(){
        this.clear();
        this.start();
        this.LabelEstErr.innerHTML="";
        this.LabelEst.innerHTML="";
        this.carregarLetra();
    }
    clear(){
        this.corretas=[];
        this.erradas=[];
    }

    async render(container){
        this.element = await baseComponent.renderTemplate({
            container,
            templatePath: "/components/numeros.component/numeros.component.html"
        });
        const actionsComponent = new ActionsComponent();
        this.actions = await actionsComponent.render(this.element.querySelector(".navbar"));

        const labelLetrasComponent = new LabelLetrasComponent();
        this.label = await labelLetrasComponent.render(this.element.querySelector(".exibicaoLetras"));    

        const labelEstatistica = new LabelEstatisticaComponent();
        this.LabelEst = await labelEstatistica.render(this.element.querySelector(".certas")); 
        this.LabelEstErr = await labelEstatistica.render(this.element.querySelector(".erradas")); 
        
        this.addEventListeners();
        this.carregarLetra();
        return this.element;
    }

    addEventListeners(){
        this.actions.querySelector('.btn-carregar').addEventListener('click', ()=>this.carregarLetra());
        this.actions.querySelector('.btn-certo').addEventListener('click', ()=>this.respostaCerta());
        this.actions.querySelector('.btn-errado').addEventListener('click', ()=>this.respostaErrada());
        this.actions.querySelector('.btn-limpar').addEventListener('click', ()=>this.restart());
    }

    carregarLetra(){
        let letter = this.getRandomLetter();
        this.label.innerHTML=letter;
        if(letter === MESSAGE_END){
            this.label.classList.remove("labelLetras");
            this.label.classList.add("labelFinalizado");
        }
    }

    getRandomLetter(){
       let index = Math.floor(Math.random() * this.listaLetras.length);       
       while(index&&this.ultimoIndex===index){
            index = Math.floor(Math.random() * this.listaLetras.length);
       }
       if(this.listaLetras.length===0){
        return MESSAGE_END
       }
        
       this.ultimoIndex = index;
       return this.listaLetras[index] 
    }

    respostaCerta(){
        if(this.listaLetras.length===0)
            return;
        this.corretas.push(this.listaLetras[this.ultimoIndex]);
        this.listaLetras.splice(this.ultimoIndex,1);
        this.LabelEst.innerHTML=`Corretas: ${this.corretas
            .sort((a,b)=>a>b?1:a<b?-1:0)    
            .join(', ')}`;
        this.carregarLetra();
    }

    respostaErrada(){
        if(this.listaLetras.length===0)
            return;
        if(this.erradas.includes(this.listaLetras[this.ultimoIndex])){
            this.carregarLetra();
            return;
        }
        this.erradas.push(this.listaLetras[this.ultimoIndex]);
        this.LabelEstErr.innerHTML=`Erradas: ${this.erradas
            .sort((a,b)=>a>b?1:a<b?-1:0)    
            .join(', ')}`;
        this.carregarLetra();
    }
}


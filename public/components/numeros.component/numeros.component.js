import {  BaseComponent } from "../base.component/base.component.js";
import {LabelLetrasComponent} from "../label-letras.component/label.letras.component.js";
import {LabelEstatisticaComponent} from "../label-estatistica.component/label-estatistica.component.js";
import {NumerosService} from "./numeros.service.js";

const baseComponent = new BaseComponent();
const numerosService = new NumerosService();
const MESSAGE_END = 'Finalizado!';
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
        this.btnCarregarLetrasListener();
        this.labelLetrasComponent = new LabelLetrasComponent();
        this.label = await this.labelLetrasComponent.render(this.element);        
        let labelEstatistica = new LabelEstatisticaComponent();
        this.LabelEst = await labelEstatistica.render(this.element); 
        this.LabelEstErr = await labelEstatistica.render(this.element); 
        this.element.querySelector(".exibicaoLetras").appendChild(this.label);
        this.element.querySelector(".certas").appendChild(this.LabelEst);
        this.element.querySelector(".erradas").appendChild(this.LabelEstErr);
        this.carregarLetra();
        return this.element;
    }

    btnCarregarLetrasListener(){
        document.querySelector('.btn-carregar').addEventListener('click', ()=>this.carregarLetra());
        document.querySelector('.btn-certo').addEventListener('click', ()=>this.respostaCerta());
        document.querySelector('.btn-errado').addEventListener('click', ()=>this.respostaErrada());
        document.querySelector('.btn-limpar').addEventListener('click', ()=>this.restart());
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


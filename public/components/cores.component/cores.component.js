import {  BaseComponent } from "../base.component/base.component.js";
import {LabelLetrasComponent} from "../label-letras.component/label.letras.component.js";
import {LabelEstatisticaComponent} from "../label-estatistica.component/label-estatistica.component.js";
const baseComponent = new BaseComponent();
const MESSAGE_END = 'Finalizado!';
export class CoresComponent {
    constructor(){
       this.limpar();
    }

    limpar(){
        this.corretas=[];
        this.erradas=[];
        this.lista = [
            {
                key: "AZUL",
                value: "rgb(0, 0, 255)"
            },
            {
                key: "VERMELHO",
                value: "rgb(255, 0, 0)"
            },
            {
                key: "VERDE",
                value: "rgb(0, 255, 0)"
            },
            {
                key: "AMARELO",
                value: "rgb(255, 255, 0)"
            },
            {
                key: "LARANJA",
                value: "rgb(255, 128, 0)"
            },
            {
                key: "ROXO",
                value: "rgb(128, 0, 255)"
            },
            {
                key: "ROSA",
                value: "rgb(255, 0, 255)"
            },
            {
                key: "CINZA",
                value: "rgb(128, 128, 128)"
            },
            {
                key: "PRETO",
                value: "rgb(0, 0, 0)"
            },
            {
                key: "MARROM",
                value: "rgb(102, 51, 0)"
            }
            
        ]
    }

    async render(container){
        this.element = await baseComponent.renderTemplate({
            container,
            templatePath: "/components/letras.component/letras.component.html"
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
        
        const btn = document.querySelector('.btn-carregar-letras');
        btn.addEventListener('click', ()=>this.carregar());

        const btnCerto = document.querySelector('.btn-certo');
        btnCerto.addEventListener('click', ()=>this.respostaCerta());

        const btnErrado = document.querySelector('.btn-errado');
        btnErrado.addEventListener('click', ()=>this.respostaErrada());

        const btnReiniciar = document.querySelector('.btn-limpar');
        btnReiniciar.addEventListener('click', ()=>{
            this.limpar();
            this.LabelEstErr.innerHTML="";
            this.LabelEst.innerHTML="";
            this.carregar();
        });
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


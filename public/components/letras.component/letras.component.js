import {  BaseComponent } from "../base.component/base.component.js";
import {LabelLetrasComponent} from "../label-letras.component/label.letras.component.js";
import {LabelEstatisticaComponent} from "../label-estatistica.component/label-estatistica.component.js";
const baseComponent = new BaseComponent();
const MESSAGE_END = 'Finalizado!';
export class LetrasComponent {
    constructor(){
       this.limpar();
    }

    limpar(){
        this.corretas=[];
        this.erradas=[];
        this.listaLetras = [
            "A",
            "B",
            "C",
            "D",
            "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
        ]
    }

    async render(container){
        this.element = await baseComponent.renderTemplate({
            container,
            templatePath: "/components/letras.component/letras.component.html"
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
        
        const btn = document.querySelector('.btn-carregar');
        btn.addEventListener('click', ()=>this.carregarLetra());

        const btnCerto = document.querySelector('.btn-certo');
        btnCerto.addEventListener('click', ()=>this.respostaCerta());

        const btnErrado = document.querySelector('.btn-errado');
        btnErrado.addEventListener('click', ()=>this.respostaErrada());

        const btnReiniciar = document.querySelector('.btn-limpar');
        btnReiniciar.addEventListener('click', ()=>{
            this.limpar();
            this.LabelEstErr.innerHTML="";
            this.LabelEst.innerHTML="";
            this.carregarLetra();
        });
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


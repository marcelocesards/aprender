import {  BaseComponent } from "../base.component/base.component.js";
import {LabelLetrasComponent} from "../label-letras.component/label.letras.component.js";
import {LabelEstatisticaComponent} from "../label-estatistica.component/label-estatistica.component.js";
import {ImagensService} from "./imagens.service.js";
import {ActionsComponent} from "../actions.component/actions.component.js";

const baseComponent = new BaseComponent();
const imagensService = new ImagensService();
const MESSAGE_END = 'Parabéns!';
export class ImagensComponent {
    constructor(){
    }
    async start(){
        this.lista = await imagensService.get();
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
            templatePath: "/components/imagens.component/imagens.component.html"
        });
        const actionsComponent = new ActionsComponent();
        this.actions = await actionsComponent.render(this.element.querySelector(".navbar"));
        this.element.querySelector(".description").innerHTML = "A criança deve dizer qual o item em destaque na imagem. Um adulto confirma se está correto e aciona uma opção no topo da tela.";

        const labelLetrasComponent = new LabelLetrasComponent();
        this.label = await labelLetrasComponent.render(this.element.querySelector(".exibicaoLetras"));        

        const labelEstatistica = new LabelEstatisticaComponent();
        this.LabelEst = await labelEstatistica.render(this.element.querySelector(".certas")); 
        this.LabelEstErr = await labelEstatistica.render(this.element.querySelector(".erradas")); 

        this.addEventListeners();
        this.clear();
        await this.start();
        this.carregar();
        return this.element;
    }

    addEventListeners(){
        this.actions.querySelector('.btn-carregar').addEventListener('click', ()=>this.carregar());
        this.actions.querySelector('.btn-certo').addEventListener('click', ()=>this.respostaCerta());
        this.actions.querySelector('.btn-errado').addEventListener('click', ()=>this.respostaErrada());
        this.actions.querySelector('.btn-limpar').addEventListener('click', ()=>this.restart());
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

            var imgOptions = {
                url: content.value,
                alternativeText: content.source
            }
            this.label.innerHTML = null;
            this.label.appendChild(this.createImage(imgOptions));
        }
    }
    createImage({url,alternativeText}){
        let img = document.createElement("img");
        img.src = url;
        img.alt = alternativeText;
        img.height = 300;
        return img;
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


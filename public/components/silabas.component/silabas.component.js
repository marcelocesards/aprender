import {  BaseComponent } from "../base.component/base.component.js";
import {LabelLetrasComponent} from "../label-letras.component/label.letras.component.js";
import {LabelEstatisticaComponent} from "../label-estatistica.component/label-estatistica.component.js";
import {SilabasService} from "./silabas.service.js";
import {ActionsComponent} from "../actions.component/actions.component.js";
import {DropZoneComponent} from "../dropzone.component/dropzone.component.js";
import {DraggableComponent} from "../draggable.component/draggable.component.js";


import 'https://cdn.interactjs.io/v1.9.20/auto-start/index.js'
import 'https://cdn.interactjs.io/v1.9.20/actions/drag/index.js'
import 'https://cdn.interactjs.io/v1.9.20/actions/resize/index.js'
import 'https://cdn.interactjs.io/v1.9.20/modifiers/index.js'
import 'https://cdn.interactjs.io/v1.9.20/dev-tools/index.js'
import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js'

const baseComponent = new BaseComponent();
const silabasService = new SilabasService();
const MESSAGE_END = 'Parabéns!';

export class SilabasComponent {
    constructor(){
        this.dropzones = [];
        this.draggables = [];
    }
    async start(){
        this.lista = await silabasService.get();
    }
    async restart(){
        this.clear();
        await this.start();
        this.LabelEstErr.innerHTML="";
        this.LabelEst.innerHTML="";
        this.element.querySelector(".exibicaoDragnDrop p").innerHTML = "";
        this.carregar();
    }
    clear(){
        this.corretas=[];
        this.erradas=[];
    }

    async render(container){
        this.element = await baseComponent.renderTemplate({
            container,
            templatePath: "/components/silabas.component/silabas.component.html"
        });
        const actionsComponent = new ActionsComponent();
        this.actions = await actionsComponent.render(this.element.querySelector(".navbar"));
        this.element.querySelector(".description").innerHTML = "A criança deve levar as sílabas ao bloco correspondente. Um adulto confirma se está correto e aciona uma opção no topo da tela.";

        const labelLetrasComponent = new LabelLetrasComponent();
        this.label = await labelLetrasComponent.render(this.element.querySelector(".exibicaoDragnDrop"));        
        this.label.classList.remove("labelLetras");

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
    async configureDropZones(){
        const dropZoneComponent = new DropZoneComponent({interact});
        await dropZoneComponent.setDropZones({accept: ".draggable"});
    }
    async configureDraggables(){
        const draggableComponent = new DraggableComponent({interact});
        await draggableComponent.setDraggables();
    }
    async createDropZone(text){
        const dropZoneComponent = new DropZoneComponent({interact,text});
        let dropzone = await dropZoneComponent.render(this.element.querySelector(".exibicaoDragnDrop"));
        dropzone.classList.add("dropzone-silaba");
        return dropzone;
    }
    async createDragable(text){
        const draggableComponent = new DraggableComponent({interact,text});
        let draggable = await draggableComponent.render(this.element.querySelector(".exibicaoDragnDrop"))
        draggable.classList.add("draggable-silaba");
        return draggable;
    }
    async carregar(){
        this.clearObjects();
        let content = this.getRandom();
        if(content === MESSAGE_END){
            this.label.innerHTML=MESSAGE_END;
            this.label.removeAttribute("style");
            this.label.classList.add("labelFinalizado");
            return;
        }
        else{

            this.label.classList.remove("labelFinalizado");

            let silabas = [...content.value];
            silabas = this.shuffle(silabas);
            this.element.querySelector(".word-exibition").appendChild(this.createLabel({
                text: content.key
            }));
            
            for(const v of content.value){
                let dropzone = await this.createDropZone(v);
                this.dropzones.push(dropzone);
            }

            for(const silaba of silabas){
                let draggable = await this.createDragable(silaba);
                this.draggables.push(draggable);
            }
            this.configureDropZones();
            this.configureDraggables();
        }
    }
    shuffle(array) {
        var currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
    createLabel({text}){
        let p = document.createElement("p");
        p.classList.add("drop-label");
        p.innerHTML = text;
        return p;
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
    clearObjects(){
        this.element.querySelector(".word-exibition").innerHTML = "";
        this.dropzones = [];
        this.draggables = [];
        this.draggables = [];
        this.element.querySelectorAll(".dropzone").forEach(element => {
            element.remove();
        });
        this.element.querySelectorAll(".draggable").forEach(element => {
            element.remove();
        });
    }
}


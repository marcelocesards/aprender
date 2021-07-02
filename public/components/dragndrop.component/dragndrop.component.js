import {  BaseComponent } from "../base.component/base.component.js";
import {LabelLetrasComponent} from "../label-letras.component/label.letras.component.js";
import {LabelEstatisticaComponent} from "../label-estatistica.component/label-estatistica.component.js";
import {DragnDropService} from "./dragndrop.service.js";
import {ActionsComponent} from "../actions.component/actions.component.js";

import 'https://cdn.interactjs.io/v1.9.20/auto-start/index.js'
import 'https://cdn.interactjs.io/v1.9.20/actions/drag/index.js'
import 'https://cdn.interactjs.io/v1.9.20/actions/resize/index.js'
import 'https://cdn.interactjs.io/v1.9.20/modifiers/index.js'
import 'https://cdn.interactjs.io/v1.9.20/dev-tools/index.js'
import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js'

const baseComponent = new BaseComponent();
const dragnDropService = new DragnDropService();
const MESSAGE_END = 'Parabéns!';
export class DragnDropComponent {
    constructor(){
    }
    async start(){
        this.lista = await dragnDropService.get();
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
            templatePath: "/components/dragndrop.component/dragndrop.component.html"
        });
        const actionsComponent = new ActionsComponent();
        this.actions = await actionsComponent.render(this.element.querySelector(".navbar"));
        this.element.querySelector(".description").innerHTML = "A criança deve levar as imagens até os blocos com o nome correspondente. Um adulto confirma se está correto e aciona uma opção no topo da tela.";

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
        this.configureDraggableItems();
    }
    configureDraggableItems(){
        interact('.draggable').draggable({
            listeners: {
                move (event) {
                    const target = event.target;
                    target.classList.remove("valid");
                    target.classList.remove("invalid");
                    target.classList.add("neutral");

                    const dataX = target.getAttribute('data-x');
                    const dataY = target.getAttribute('data-y');
                    const initialX = parseFloat(dataX) || 0;
                    const initialY = parseFloat(dataY) || 0;

                    const deltaX = event.dx;
                    const deltaY = event.dy;

                    const newX = initialX + deltaX;
                    const newY = initialY + deltaY;

                    target.style.transform = `translate(${newX}px, ${newY}px)`;
                    target.setAttribute('data-x', newX);
                    target.setAttribute('data-y', newY);
                }
            }
        })
        interact('.dropzone').dropzone({
            accept: '.drag0, .drag1',
            listeners: {
                drop (event) {
                    const target = event.target;
                    const relatedTarget = event.relatedTarget;
                    
                    if(target.getAttribute("key")==relatedTarget.getAttribute("key")){
                        relatedTarget.classList.add("valid");
                        relatedTarget.classList.remove("invalid");
                        relatedTarget.classList.remove("neutral");
                    }
                    else{
                        relatedTarget.classList.add("invalid");
                        relatedTarget.classList.remove("neutral");
                        relatedTarget.classList.remove("valid");
                    }
                }
            }
        });
    }
    carregar(){
        this.clearImages();
        let content = this.getRandom();
        if(content === MESSAGE_END){
            this.label.innerHTML=MESSAGE_END;
            this.label.removeAttribute("style");
            this.label.classList.add("labelFinalizado");
            return;
        }
        else{
            let content2 = this.getRandom();
            if(content2 === MESSAGE_END){
                this.label.innerHTML=MESSAGE_END;
                this.label.removeAttribute("style");
                this.label.classList.add("labelFinalizado");
            }
            let count=0;
            while(content.value==content2.value){
                content2 = this.getRandom();
                count++;
                if(count==5){
                    this.label.innerHTML=MESSAGE_END;
                    this.label.removeAttribute("style");
                    this.label.classList.add("labelFinalizado");
                    return;
                }
            }

            this.label.classList.remove("labelFinalizado");

            let names = [content.key,content2.key];
            names = this.shuffle(names);
            let div1 = this.element.querySelector("#div1")
            div1.appendChild(this.createLabel({
                text: names[0]
            }));
            div1.setAttribute("key",names[0]);

            let div2 = this.element.querySelector("#div2")
            div2.appendChild(this.createLabel({
                text: names[1]
            }));
            div2.setAttribute("key",names[1]);

            let div3 = this.element.querySelector("#div3")
            div3.appendChild(this.createImage({
                url: content.value,
                alternativeText: content.source
            }));
            div3.setAttribute("key",content.key);
            
            let div4 = this.element.querySelector("#div4")
            div4.appendChild(this.createImage({
                url: content2.value,
                alternativeText: content2.source
            }));
            div4.setAttribute("key",content2.key);
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
    createImage({url,alternativeText}){
        let img = document.createElement("img");
        img.id = alternativeText;
        img.src = url;
        img.alt = alternativeText;
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
    clearImages(){
        this.element.querySelectorAll(".dropzone").forEach(element => {
            element.innerHTML = "";
        });
        this.element.querySelectorAll(".draggable").forEach(element => {
            element.innerHTML = "";
            element.removeAttribute("style");
            element.removeAttribute("data-x");
            element.removeAttribute("data-y");
            element.classList.add("neutral");
            element.classList.remove("invalid");
            element.classList.remove("valid");
        });
    }
}


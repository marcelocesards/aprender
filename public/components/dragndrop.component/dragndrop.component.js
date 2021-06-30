import {  BaseComponent } from "../base.component/base.component.js";
import {LabelLetrasComponent} from "../label-letras.component/label.letras.component.js";
import {LabelEstatisticaComponent} from "../label-estatistica.component/label-estatistica.component.js";
import {DragnDropService} from "./dragndrop.service.js";
import {ActionsComponent} from "../actions.component/actions.component.js";

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
        this.element.querySelectorAll(".drop").forEach((element)=>{
            element.addEventListener("drop",(event)=>this.drop(event));
            element.addEventListener("dragover",(event)=>this.allowDrop(event));
        })
    }

    carregar(){
        this.clearDrops();
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
            this.element.querySelector("#div1").appendChild(this.createLabel({
                text: names[0]
            }));
            this.element.querySelector("#div2").appendChild(this.createLabel({
                text: names[1]
            }));

            this.element.querySelector("#div3").appendChild(this.createImage({
                url: content.value,
                alternativeText: content.source
            }));
            
            this.element.querySelector("#div4").appendChild(this.createImage({
                url: content2.value,
                alternativeText: content2.source
            }));
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
        img.height = 200;
        img.draggable = true;
        img.addEventListener("drag",(event)=>this.drag(event));
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
    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        this.dataTransfer = ev.target.id;
    }

    drop(ev) {
        ev.preventDefault();
        let data = this.dataTransfer;
        ev.target.appendChild(document.getElementById(data));
    }
    clearDrops(){
        this.element.querySelectorAll(".drop").forEach(element => {
            element.innerHTML="";
        });
    }
}


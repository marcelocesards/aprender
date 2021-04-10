import {LetrasComponent} from "./components/letras.component/letras.component.js";
import {CoresComponent} from "./components/cores.component/cores.component.js";
import {NumerosComponent} from "./components/numeros.component/numeros.component.js";
import {ImagensComponent} from "./components/imagens.component/imagens.component.js";
import {ModeOptionsComponent} from './components/mode-options.component/mode-options.component.js';

async function renderModeOptions(){
    let modeOptions = new ModeOptionsComponent();
    await modeOptions.render(document.querySelector(".nav-bar"));
    window.addEventListener("message", receiveMessage, false);
    aprender[modo.value]();
}

async function receiveMessage(event){
    console.log(event);
    
    if(event.data.indexOf("start-mode:")==0 && window.location.href.indexOf(event.origin)==0){
        letras.innerHTML = null;
        cores.innerHTML = null;
        numeros.innerHTML = null;
        imagens.innerHTML = null;
        aprender[event.data.split(":")[1]]();
    }
}
renderModeOptions();

const aprender = {
    letras: ()=>new LetrasComponent().render(document.querySelector("#letras")),
    cores: ()=>new CoresComponent().render(document.querySelector("#cores")),
    numeros: ()=>new NumerosComponent().render(document.querySelector("#numeros")),
    imagens: ()=>new ImagensComponent().render(document.querySelector("#imagens"))
}
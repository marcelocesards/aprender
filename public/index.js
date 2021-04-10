import {LetrasComponent} from "./components/letras.component/letras.component.js"
import {CoresComponent} from "./components/cores.component/cores.component.js"
import {NumerosComponent} from "./components/numeros.component/numeros.component.js"
import {ImagensComponent} from "./components/imagens.component/imagens.component.js"

const aprender = {
 letras: renderLetras,
 cores: renderCores,
 numeros: renderNumeros,
 imagens: renderImagens
}
async function renderLetras(){
    let letrasComponent = new LetrasComponent();
    await letrasComponent.render(document.querySelector("#letras"));
}
async function renderCores(){
    let coresComponent = new CoresComponent();
    await coresComponent.render(document.querySelector("#cores"));
}
async function renderNumeros(){
    let numerosComponent = new NumerosComponent();
    await numerosComponent.render(document.querySelector("#numeros"));
}
async function renderImagens(){
    let imagensComponent = new ImagensComponent();
    await imagensComponent.render(document.querySelector("#imagens"));
}

function render(){
    letras.innerHTML = null;
    cores.innerHTML = null;
    numeros.innerHTML = null;
    imagens.innerHTML = null;
    aprender[modo.value]();
}
modo.addEventListener("change",render);

render();
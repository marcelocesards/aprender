import {LetrasComponent} from "./components/letras.component/letras.component.js"
import {CoresComponent} from "./components/cores.component/cores.component.js"

const aprender = {
 letras: renderLetras,
 cores: renderCores   
}
async function renderLetras(){
    let letrasComponent = new LetrasComponent();
    await letrasComponent.render(document.querySelector("#letras"));
}
async function renderCores(){
    let coresComponent = new CoresComponent();
    await coresComponent.render(document.querySelector("#cores"));
}

function render(){
    letras.innerHTML = null;
    cores.innerHTML = null;
    aprender[modo.value]();
}
modo.addEventListener("change",render);

render();
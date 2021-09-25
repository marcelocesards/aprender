import {LetrasComponent} from "./components/letras.component/letras.component.js";
import {CoresComponent} from "./components/cores.component/cores.component.js";
import {NumerosComponent} from "./components/numeros.component/numeros.component.js";
import {ImagensComponent} from "./components/imagens.component/imagens.component.js";
import {DragnDropComponent} from "./components/dragndrop.component/dragndrop.component.js";
import {SilabasComponent} from "./components/silabas.component/silabas.component.js";
import {StartPage} from "./components/start.page/start.page.js";
import {Messenger} from "./components/messenger.component/messenger.component.js";

const mainContent = document.querySelector("#main-content");
const messenger = new Messenger();
const Components = {
    letras: LetrasComponent,
    cores: CoresComponent,
    numeros: NumerosComponent,
    imagens: ImagensComponent,
    arrastar: DragnDropComponent,
    silabas: SilabasComponent,
    start: StartPage
}

async function renderModeOptions(){
    messenger.addSubscriber({type:"select-mode", callback:receiveMessage});
    let mode = localStorage.getItem("mode") || "start";
    executeMode(mode);
}

async function receiveMessage(data){
    localStorage.setItem("mode",data.message);
    executeMode(data.message);
}
renderModeOptions();

function executeMode(mode){
    mainContent.innerHTML = "";
    new Components[mode]().render(mainContent);
}
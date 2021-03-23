import {LetrasComponent} from "./components/letras.component/letras.component.js"
async function render(){
    let letrasComponent = new LetrasComponent();
    await letrasComponent.render(document.querySelector("#letras"));
}

render();
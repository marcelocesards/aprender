export class LetrasService {
    async get(){
        return await (await fetch("/components/letras.component/letras.json")).json();
    }
}
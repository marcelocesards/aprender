export class ImagensService {
    async get(){
        return await (await fetch("/components/imagens.component/imagens.json")).json();
    }
}
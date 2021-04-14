export class CoresService {
    async get(){
        return await (await fetch("/components/cores.component/cores.json")).json();
    }
}
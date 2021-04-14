export class NumerosService {
    get(){
        let numeros = [];
        for(let i = 0;i<10;i++){
            numeros.push(Math.floor(Math.random() * 100));
        }
        return Promise.resolve(numeros);
    }
}
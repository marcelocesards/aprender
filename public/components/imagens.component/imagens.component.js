import {  BaseComponent } from "../base.component/base.component.js";
import {LabelLetrasComponent} from "../label-letras.component/label.letras.component.js";
import {LabelEstatisticaComponent} from "../label-estatistica.component/label-estatistica.component.js";
const baseComponent = new BaseComponent();
const MESSAGE_END = 'Finalizado!';
export class ImagensComponent {
    constructor(){
       this.limpar();
    }

    limpar(){
        this.corretas=[];
        this.erradas=[];
        this.lista = [
            {
                key: "CACHORRO",
                value: 'https://image.freepik.com/fotos-gratis/adoravel-cachorro-basenji-marrom-e-branco-sorrindo-e-dando-mais-uns-cinco-isolado-no-branco_346278-1657.jpg',
                source: '<a href="https://br.freepik.com/fotos/fundo">Fundo foto criado por bublikhaus - br.freepik.com</a>'
            },
            {
                key: "GATO",
                value: "https://image.freepik.com/fotos-gratis/o-gato-vermelho-ou-branco-eu-no-estudio-branco_155003-13189.jpg",
                source: '<a href="https://br.freepik.com/fotos/natureza">Natureza foto criado por master1305 - br.freepik.com</a>'
            },
            {
                key: "BICICLETA",
                value: "https://image.freepik.com/fotos-gratis/desporto-moto-vermelha_1159-812.jpg?1",
                source: '<a href="https://br.freepik.com/fotos/esporte">Esporte foto criado por visnezh - br.freepik.com</a>'
            },
            {
                key: "CHAPÉU",
                value: "https://image.freepik.com/fotos-gratis/velho-chapeu-fedora_1101-692.jpg",
                source: '<a href="https://br.freepik.com/fotos/moda">Moda foto criado por kstudio - br.freepik.com</a>'
            },
            {
                key: "SORVETE",
                value: "https://image.freepik.com/vetores-gratis/ilustracao-do-icone-dos-desenhos-animados-de-cone-de-sorvete-conceito-de-icone-de-comida-doce-isolado-estilo-flat-cartoon_138676-2924.jpg",
                source: '<a href="https://br.freepik.com/vetores/alimento">Alimento vetor criado por catalyststuff - br.freepik.com</a>'
            },
            {
                key: "BOLA",
                value: "https://image.freepik.com/vetores-gratis/bola-de-futebol-realista-isolada-de-vetor-sobre-o-branco_1284-41932.jpg",
                source: '<a href="https://br.freepik.com/vetores/futebol">Futebol vetor criado por macrovector - br.freepik.com</a>'
            },
            {
                key: "CENOURA",
                value: "https://image.freepik.com/vetores-gratis/projeto-cenoura-colorido_1166-11.jpg",
                source: '<a href="https://br.freepik.com/vetores/alimento">Alimento vetor criado por bakar015 - br.freepik.com</a>'
            },
            {
                key: "ESTRELA",
                value: "https://image.freepik.com/vetores-gratis/comecar_53876-25533.jpg",
                source: '<a href="https://br.freepik.com/vetores/logotipo">Logotipo vetor criado por rawpixel.com - br.freepik.com</a>'
            },
            {
                key: "SAPO",
                value: "https://image.freepik.com/vetores-gratis/sapo-verde-bonito-na-folha-de-lotus_1308-40027.jpg",
                source: '<a href="https://br.freepik.com/vetores/agua">Água vetor criado por brgfx - br.freepik.com</a>'
            },
            {
                key: "BANANA",
                value: "https://image.freepik.com/vetores-gratis/bando-de-banana-amarela-madura-de-vetor-isolado-no-fundo-branco_1284-45456.jpg",
                source: '<a href="https://br.freepik.com/vetores/alimento">Alimento vetor criado por macrovector - br.freepik.com</a>'
            },
            {
                key: "SAPATO",
                value: "https://image.freepik.com/fotos-gratis/sapatos-marrons-isolados-no-fundo-branco-em-estudio_268835-1354.jpg",
                source:  '<a href="https://br.freepik.com/fotos/renda">Renda foto criado por vwalakte - br.freepik.com</a>'
            },
            {
                key: "CARRO",
                value: "https://image.freepik.com/psd-gratuitas/projeto-isolado-do-carro-mock-up_1310-1174.jpg",
                source:  '<a href="https://br.freepik.com/psd/fundo">Fundo psd criado por zlatko_plamenov - br.freepik.com</a>'
            },
            {
                key: "CHOCOLATE",
                value: "https://image.freepik.com/fotos-gratis/diferentes-tipos-de-chocolate-em-fundo-laranja_23-2148222352.jpg",
                source:  '<a href="https://br.freepik.com/fotos/fundo">Fundo foto criado por freepik - br.freepik.com</a>'
            },
            {
                key: "MORANGO",
                value: "https://image.freepik.com/fotos-gratis/morango-isolada-no-fundo-branco_1232-1974.jpg",
                source:  '<a href="https://br.freepik.com/fotos/fundo">Fundo foto criado por jannoon028 - br.freepik.com</a>'
            },
            {
                key: "BEBÊ",
                value: "https://image.freepik.com/fotos-gratis/e-tao-bom-olhar-para-o-bebezinho_329181-14604.jpg",
                source:  '<a href="https://br.freepik.com/fotos/bebe">Bebê foto criado por gpointstudio - br.freepik.com</a>'
            }
        ]
    }

    async render(container){
        this.element = await baseComponent.renderTemplate({
            container,
            templatePath: "/components/imagens.component/imagens.component.html"
        });
        this.addEventListeners();
        this.labelLetrasComponent = new LabelLetrasComponent();
        this.label = await this.labelLetrasComponent.render(this.element);        
        let labelEstatistica = new LabelEstatisticaComponent();
        this.LabelEst = await labelEstatistica.render(this.element); 
        this.LabelEstErr = await labelEstatistica.render(this.element); 
        this.element.querySelector(".exibicaoLetras").appendChild(this.label);
        this.element.querySelector(".certas").appendChild(this.LabelEst);
        this.element.querySelector(".erradas").appendChild(this.LabelEstErr);
        this.carregar();
        return this.element;
    }

    addEventListeners(){
        
        const btn = this.element.querySelector('.btn-carregar');
        btn.addEventListener('click', ()=>this.carregar());

        const btnCerto = this.element.querySelector('.btn-certo');
        btnCerto.addEventListener('click', ()=>this.respostaCerta());

        const btnErrado = this.element.querySelector('.btn-errado');
        btnErrado.addEventListener('click', ()=>this.respostaErrada());

        const btnReiniciar = this.element.querySelector('.btn-limpar');
        btnReiniciar.addEventListener('click', ()=>{
            this.limpar();
            this.LabelEstErr.innerHTML="";
            this.LabelEst.innerHTML="";
            this.carregar();
        });
    }

    carregar(){
        let content = this.getRandom();
        if(content === MESSAGE_END){
            this.label.innerHTML=MESSAGE_END;
            this.label.removeAttribute("style");
            this.label.classList.remove("labelLetras");
            this.label.classList.add("labelFinalizado");
        }
        else{
            this.label.classList.add("labelLetras");
            this.label.classList.remove("labelFinalizado");

            var imgOptions = {
                url: content.value,
                alternativeText: content.source
            }
            this.label.innerHTML = null;
            this.label.appendChild(this.createImage(imgOptions));
        }
    }
    createImage({url,alternativeText}){
        let img = document.createElement("img");
        img.src = url;
        img.alt = alternativeText;
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
}


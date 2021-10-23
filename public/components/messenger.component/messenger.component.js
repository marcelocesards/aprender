export class Messenger {
    constructor(){
        this.publishers = [];
        this.subscribers = [];
        this.addEventListeners();
    }
    addEventListeners(){
        window.addEventListener("message", (event)=>this.handleMessage(event), false);
    }
    handleMessage(event){
        const data = JSON.parse(event.data);
        for(const subscriber of this.subscribers){
            if(subscriber.type === data.type && window.location.href.indexOf(event.origin)==0){
                subscriber.emit(data);
            }
        }
    }
    subscribe({type,callback}){
        this.subscribers.push({type,emit:callback});
    }
}
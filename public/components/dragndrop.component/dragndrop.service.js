const db = firebase.database();
export class DragnDropService {
    async get(){
        return new Promise(resolve=>{
            db.ref('imagens').once('value').then((snapshot) => {
                resolve(snapshot.val());
            });
        })
    }
}
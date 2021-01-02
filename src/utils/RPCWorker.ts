import Defer from "./Defer";

class RPCWorker{
    private worker:Worker;
    private defers = new Map<number,Defer<any>>();
    private callid = 0;
    constructor(worker:Worker){
        this.worker = worker;
        this.worker.onmessage = this.onMessage.bind(this)
    }
    private onMessage(event:any){
        let {ok,data,callid} : {ok:boolean,data:any,callid:number} = event.data;
        if(!ok){
            let err:any = new Error();
            err.stack = data;
            throw err;
        }
        (this.defers.get(callid) as Defer<any>).resolve(data);
        this.defers.delete(callid);
    }
    async send(method:string,params:any[] = []) : Promise<any>{
        let callid = this.callid++;
        let defer = new Defer();
        this.defers.set(callid,defer);
        this.worker.postMessage({
            callid,
            method,
            params
        });
        return await defer.promise;
    }
}

export default RPCWorker;
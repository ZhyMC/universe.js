import { EventEmitter } from "events";
import {Defer} from "./Defer";

class RPCWorker extends EventEmitter{
    private worker:Worker;
    private defers = new Map<number,Defer<any>>();
    private callid = 0;
    constructor(worker:Worker){
        super();
        this.worker = worker;
        this.worker.onmessage = this.onMessage.bind(this)
    }

    private onMessage({data}:any){
        for(let e of data){
            this.handleEvent(e);
        }
    }
    private handleEvent(event:any){
        let {eventname,ok,data,callid} : {eventname:string,ok:boolean,data:any,callid:number} = event;

        if(eventname == "invoke"){
            if(!ok){
                let err:any = new Error();
                err.stack = data;
                throw err;
            }
            (this.defers.get(callid) as Defer<any>).resolve(data);
    
            this.defers.delete(callid);
        }else
            this.emit(eventname,data);
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

export {RPCWorker};
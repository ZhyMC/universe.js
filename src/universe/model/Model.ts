import { EventEmitter } from "events";
import LokiDB from "lokijs";
import IModel from "./IModel";

type DBModelLine = {
    key:string,
};


class Model extends EventEmitter implements IModel{
    protected db : LokiDB;
    constructor(db : LokiDB){
        super();
        this.db = db;
    }
    getName(){
        return this.constructor.name;
    }
    public add<T extends DBModelLine>(obj:T,datamodel:string) : number{
        return (this.db.getCollection<T>(datamodel).insertOne(obj) as LokiObj).$loki;
    }
    public has(key:string,datamodel:string) : boolean{
        try{
            this.find(datamodel,key);
            return true; 
        }catch(err){
            return false;
        }
    }
    public remove(key:string,datamodel:string){
        this.db.getCollection(datamodel).findAndRemove({key});
    }
    public find(key:string,datamodel:string) : any{
        let res = this.db.getCollection(datamodel).findOne({key});
        if(!res)
            throw new Error(`${datamodel} - ${key} doesn't exists`);
        return res;
    }

}

export default Model;
import { EventEmitter } from "events";
import LokiDB from "lokijs";
import DataModel from "../data/DataModel";
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
    public add<T extends DBModelLine>(obj:T,datamodel:DataModel) : number{
        return (this.db.getCollection<T>(datamodel.name).insertOne(obj) as LokiObj).$loki;
    }
    public has(key:string,datamodel:DataModel) : boolean{
        try{
            this.find(key,datamodel);
            return true; 
        }catch(err){
            return false;
        }
    }
    public remove(key:string,datamodel:DataModel){
        this.db.getCollection(datamodel.name).findAndRemove({key});
    }
    public find(key:string,datamodel:DataModel) : any{
        let res = this.db.getCollection(datamodel.name).findOne({key});
        if(!res)
            throw new Error(`${datamodel} - ${key} doesn't exists`);
        return res;
    }
    public set(key:string,datamodel:DataModel,data:any){
        this.db.getCollection(datamodel.name).findAndUpdate({key},(o)=>{
            for(let k in data)
                o[k] = data[k];
        });
    }

}

export default Model;
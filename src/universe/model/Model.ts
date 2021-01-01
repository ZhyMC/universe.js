import { EventEmitter } from "events";
import LokiDB from "lokijs";
import DataModel from "../data/DataModel";
import IUniverseDB from "../data/db/IUniverseDB";
import IModel from "./IModel";

type DBModelLine = {
    key:string,
};


class Model extends EventEmitter implements IModel{
    protected db : IUniverseDB;
    constructor(db : IUniverseDB){
        super();
        this.db = db;
    }
    getName(){
        return this.constructor.name;
    }
    public async add(obj:any,datamodel:DataModel) : Promise<string>{
        return this.db.insertOne(datamodel.name,obj);
    }
    public async has(key:string,datamodel:DataModel) : Promise<boolean>{
        return this.db.has(datamodel.name,{key});        
    }
    public async remove(key:string,datamodel:DataModel):Promise<void>{
        return this.db.findAndRemove(datamodel.name,{key});
    }
    public find(key:string,datamodel:DataModel) : Promise<any>{
        return this.db.findOne(datamodel.name,{key});
    }
    public set(key:string,datamodel:DataModel,data:Promise<any>){
        return this.db.findAndUpdate(datamodel.name,{key},data);
    }

}

export default Model;
import { EventEmitter } from "events";
import LokiDB from "lokijs";
import IModel from "./IModel";

type DBModelLine = {
    key:string,
};


class Model extends EventEmitter implements IModel{
    protected db : LokiDB = new LokiDB("");
    setDataModel(db : LokiDB){
        this.db = db;
    }
    getName(){
        return this.constructor.name;
    }
    protected add<T extends DBModelLine>(model_name:string,obj:T) : number{
        return (this.db.getCollection<T>(model_name).insertOne(obj) as LokiObj).$loki;
    }
    protected find(model_name:string,key:string) : any{
        let res = this.db.getCollection(model_name).findOne({key});
        if(!res)
            throw new Error(`${model_name} - ${key} doesn't exists`);
        return res;
    }

}

export default Model;
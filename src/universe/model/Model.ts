import { EventEmitter } from "events";
import LokiDB from "lokijs";
import IModel from "./IModel";

class Model extends EventEmitter implements IModel{
    protected datamodel : LokiDB = new LokiDB("");
    setDataModel(datamodel : LokiDB){
        this.datamodel = datamodel;
    }
    getName(){
        return this.constructor.name;
    }

}

export default Model;
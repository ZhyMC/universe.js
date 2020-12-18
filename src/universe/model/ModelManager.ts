import IModel from "./IModel";
import assert from "assert";
import IModelManager from "./IModelManager";
import LokiDB from "lokijs"
class ModelManager implements IModelManager{
    private models : Map<string,IModel> = new Map();
    private db : LokiDB;
    private enabled : boolean = false;
    constructor(datamodel : LokiDB){
        this.db = datamodel;
    }
    setEnabled(){
        this.enabled = true;
    }
    add(model : IModel){
        model.setDataModel(this.db);
        this.models.set(model.getName(),model);
    }
    get(name : string) : IModel{
        assert(this.enabled,"this model manager has not been enabled");
        assert(this.models.has(name),`don't have this model ${name}`);
        return this.models.get(name) as IModel;
    }

}

export default ModelManager;

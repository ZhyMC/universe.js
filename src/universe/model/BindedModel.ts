import Model from "./Model";
import LokiDB from "lokijs";
import DataModel from "../data/DataModel";

type DBModelLine = {
    key:string,
};
class BindedModel extends Model{

    private datamodel:DataModel;
    constructor(datamodel:DataModel,db:LokiDB){
        super(db);
        this.datamodel = datamodel;
    }
    add<T extends DBModelLine>(obj:T) : number{
        return super.add.call(this,obj,this.datamodel.name);
    }
    has(key:string):boolean{
        return super.has.call(this,key,this.datamodel.name);
    }
    remove(key:string){
        return super.remove.call(this,key,this.datamodel.name);
    }
    find(key:string){
        return super.find.call(this,key,this.datamodel.name);
    }
}

export default BindedModel;

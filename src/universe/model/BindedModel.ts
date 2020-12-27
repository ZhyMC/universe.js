import Model from "./Model";
import LokiDB from "lokijs";
import IDataModel from "../data/IDataModel";

type DBModelLine = {
    key:string,
};
class BindedModel extends Model{

    private datamodel:IDataModel;
    constructor(datamodel:IDataModel,db:LokiDB){
        super(db);
        this.datamodel = datamodel;
    }
    add<T extends DBModelLine>(obj:T) : number{
        return super.add.call(this,obj,this.datamodel.getName());
    }
    has(key:string):boolean{
        return super.has.call(this,key,this.datamodel.getName());
    }
    remove(key:string){
        return super.remove.call(this,key,this.datamodel.getName());
    }
    find(key:string){
        return super.find.call(this,key,this.datamodel.getName());
    }
}

export default BindedModel;

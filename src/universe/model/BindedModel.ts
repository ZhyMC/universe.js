import {Model} from "./Model";
import {DataModel} from "../data/DataModel";
import {IUniverseDB} from "../data/db/IUniverseDB";

type DBModelLine = {
    key:string,
};
class BindedModel extends Model{

    private datamodel:DataModel;
    constructor(datamodel:DataModel,db:IUniverseDB){
        super(db);
        this.datamodel = datamodel;
    }
    bulkAdd(obj:any){
        return super.bulkAdd.call(this,obj,this.datamodel);
    }
    add<T extends DBModelLine>(obj:T){
        return super.add.call(this,obj,this.datamodel);
    }
    has(key:string){
        return super.has.call(this,key,this.datamodel);
    }
    remove(key:string){
        return super.remove.call(this,key,this.datamodel);
    }
    find(key:string){
        return super.find.call(this,key,this.datamodel);
    }
    set(key:string,data:any){
        return super.set.call(this,key,this.datamodel,data);
    }
}

export {BindedModel};

import BindedModel from "./BindedModel";
import LokiDB from "lokijs";
import DataModel from "../data/DataModel";

class SingleModel extends BindedModel{
    private binded_key : string;
    private _datamodel : DataModel;
    constructor(binded_key:string,datamodel:DataModel,db:LokiDB){
        super(datamodel,db);
        this.binded_key = binded_key;
        this._datamodel = datamodel;
    }
    add(obj:any = {}){
        let schema = this._datamodel;
        let data : any = {};

        for(let prop in schema.prop){
            data[prop] = schema.prop[prop].default;
        }
        for(let key in obj){
            data[key] = obj[key];
        }

        return super.add.call(this,{
            ...data,
            key:this.binded_key
        })
    }
    has():boolean{
        return super.has.call(this,this.binded_key);
    }
    remove():void{
        return super.remove.call(this,this.binded_key);
    }
    find(){
        return super.find.call(this,this.binded_key);
    }
}

export default SingleModel;

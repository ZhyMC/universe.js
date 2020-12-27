import BindedModel from "./BindedModel";
import LokiDB from "lokijs";
import IDataModel from "../data/IDataModel";

class SingleModel extends BindedModel{
    private binded_key : string;
    private _datamodel : IDataModel;
    constructor(binded_key:string,datamodel:IDataModel,db:LokiDB){
        super(datamodel,db);
        this.binded_key = binded_key;
        this._datamodel = datamodel;
    }
    add(obj:any = {}){
        let schema = this._datamodel.getSchema();
        let data : any = {};

        for(let {key,def_value} of schema){
            data[key] = def_value;
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

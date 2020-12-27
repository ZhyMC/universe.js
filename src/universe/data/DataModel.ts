import IDataModel from "./IDataModel";


class DataModel implements IDataModel{
    public key:string = "";
    constructor(){

    }
    getIndice() : string[]{
        return [];
    }
    getName(){
        return this.constructor.name;
    }
    getSchema(){
        return Object.entries(this).map(([key,value])=>{
            return {key,def_value:value};
        });
    }
}

export default DataModel;
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
        return Object.keys(this);
    }
}

export default DataModel;
import LokiDB from "lokijs";
import DataModel from "./DataModel";


class DbBuilder{
    private db : LokiDB;
    private models : DataModel[];
    constructor(datamodels : DataModel[]){
        this.db = new LokiDB("game");
        this.models = datamodels;
        this.initCollections();
    }
    private initCollections(){
        this.models.forEach((model)=>{
            this.db.addCollection(model.name,{indices:model.indice || [],disableChangesApi:false});
        });
    }
    getDatabase(){
        return this.db;
    }
    
}


export default DbBuilder;
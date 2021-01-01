import LokiDB from "lokijs";
import DataModel from "./DataModel";
import IUniverseDB from "./db/IUniverseDB";


class DbBuilder{
    private db : IUniverseDB;
    private models : DataModel[];
    constructor(db : IUniverseDB,datamodels : DataModel[]){
        this.db = db;
        
        this.models = datamodels;
        this.initCollections();
    }
    private initCollections(){
        this.models.forEach((model)=>{
            this.db.createSheet(model.name,["key"],Object.keys(model.prop));
        });
    }
    getDatabase(){
        return this.db;
    }
    
}


export default DbBuilder;
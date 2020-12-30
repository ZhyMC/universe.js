import LokiDB from "lokijs";

class DataWatcher{
    private db : LokiDB;
    private cache : CollectionChange[] = [];
    constructor(db:LokiDB){
        this.db = db;
    }
    getDB(){
        return this.db;
    }
    getWatched(filter?:string[]){
        if(!filter)
            return this.cache;

        return this.cache.filter((change)=>{
            return filter.indexOf(change.name)!=-1;
        });
    }
    flushWatched(){
        this.cache = this.db.generateChangesNotification();
        this.db.clearChanges();
    }

}

export default DataWatcher;
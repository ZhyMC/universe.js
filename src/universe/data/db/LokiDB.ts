import IUniverseDB,{Change,RowData,FindCondition} from "./IUniverseDB";
import Loki from "lokijs";


class LokiDB implements IUniverseDB{
    private db : Loki;
    constructor(){
        this.db = new Loki("universe");
    }
    async open(){
        
    }
    async createSheet(sheet:string,indexes:string[] = []){
        this.db.addCollection(sheet,{indices:indexes,unique:indexes,disableChangesApi:false});
    }
    async findOne(sheet:string,condi:FindCondition){
        return this.db.getCollection(sheet).findOne(condi);
    }
    async find(sheet:string,condi:FindCondition){
        return this.db.getCollection(sheet).findOne(condi);
    }
    async insertMany(sheet:string,rows:RowData[]){
        await this.db.getCollection(sheet).insert(rows);
    }
    async has(sheet:string,condi:FindCondition) : Promise<boolean>{
        if(await this.find(sheet,condi))
            return true;
        else
            return false;
    }
    async insertOne(sheet:string,row:RowData){
        return this.db.getCollection(sheet).insertOne(row).$loki;
    }
    async findAndRemove(sheet:string,condi:FindCondition){
        this.db.getCollection(sheet).findAndRemove(condi);
    }
    async findAndUpdate(sheet:string,condi:FindCondition,delta:RowData){
        this.db.getCollection(sheet).findAndUpdate(condi,(obj)=>{
            for(let key in delta)
                obj[key] = delta[key];
            return obj;
        });
    }
    async getDeltaChanges(sheets:string[] = []){
        let arr = this.db.generateChangesNotification();
        let all = arr.map((row)=>{
            if(["U","I","D"].indexOf(row.operation)==-1)
                throw new Error(`row.operation ${row.operation} is unknown`);
            let operation = row.operation as "U" | "I" | "D";
            
            return {sheet:row.name,operation,row:row.obj}
        });

        return all.filter((x)=>(sheets.indexOf(x.sheet) != -1))

    }
    async clearChanges(){
        await this.db.clearChanges();
    }
}

export default LokiDB;
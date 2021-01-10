import {IUniverseDB,Change,RowData,FindCondition} from "./IUniverseDB";
import Loki = require("lokijs");


class LokiDB implements IUniverseDB{
    private db : Loki;
    private changes : CollectionChange[] = [];
    private cached : CollectionChange[] = [];
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
    private convertChange(collchange : CollectionChange){
        if(["U","I","D"].indexOf(collchange.operation)==-1)
            throw new Error(`row.operation ${collchange.operation} is unknown`);
        let operation = collchange.operation as "U" | "I" | "D";
        
        let is = operation != "D";
        return {sheet:collchange.name,operation,is,unikey:`${collchange.name}#${collchange.obj.$loki}`,row:collchange.obj};
        
    }
    async getSheetChanges(sheet:string){
        let arr =this.cached;
        let all = arr.map((row)=>{
            return this.convertChange(row);
        });
        return all.filter((x)=>(sheet == x.sheet));
    }
    async getCompChanges(comp:string){
        let ret : Change[] = [];
        this.cached.forEach((change)=>{
            if(change.obj[comp])
                ret.push(this.convertChange(change));
        })
        return ret;
    }
    async clearChanges(){
        this.cached = this.db.generateChangesNotification().concat([]); 
        await this.db.clearChanges();

    }
}

export {LokiDB};
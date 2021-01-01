import IUniverseDB, { Change, RowData } from "./IUniverseDB";
import Dexie from "dexie";

class WebIndexedDB implements IUniverseDB{
    private dexie : Dexie;
    private stores :{[key:string]:string} = {};
    private changes : Change[] = [];

    constructor(){
        this.dexie = new Dexie("universe");
    }
    async open() : Promise<void>{
        if(this.dexie.isOpen())
            throw new Error("this db is already open");

        await this.dexie.delete();

        console.log(this.stores);
        this.dexie.version(1).stores(this.stores);
        await this.dexie.open();

        let stores = Object.keys(this.stores);
        for(let store of stores){
            this.dexie.table(store).hook("creating",(primKey,obj)=>{
                this.changes.push({
                    sheet:store,
                    operation:"I",
                    row:obj
                })
            });
            this.dexie.table(store).hook("updating",(mods,primKey,obj)=>{
                this.changes.push({
                    sheet:store,
                    operation:"U",
                    row:obj
                })
            });
            this.dexie.table(store).hook("deleting",(primKey,obj)=>{
                this.changes.push({
                    sheet:store,
                    operation:"D",
                    row:obj
                })
            });
            
        }
    };
    async createSheet(sheet: string, indexes: string[] = [], column: string[] = []): Promise<void> {
        let indexed = ["++id","&key"];
        indexes = indexes.filter((x)=>(x!="key"));
        indexed.push(...indexes);

        this.stores[sheet] = indexed.join(",");
    }
    find(sheet: string, condi: RowData): Promise<RowData[]> {
        return this.dexie.table(sheet).where(condi).toArray();
    }
    findOne(sheet: string, condi: RowData): Promise<RowData> {
        return this.dexie.table(sheet).where(condi).first();
    }
    async insertMany(sheet: string, rows: RowData[]): Promise<void> {
        const split : number = 200;
        for(let off=0;off<rows.length;off+=split){
            await this.dexie.table(sheet).bulkPut(rows.slice(off,off+split));
        }
    }
    async insertOne(sheet: string, row: RowData): Promise<string> {
        let num = await this.dexie.table(sheet).put(row,"id");
        return num.toString();
    }
    async has(sheet: string, condi: RowData): Promise<boolean> {
        let count = await this.dexie.table(sheet).where(condi).count();
        return count > 0;
    }
    async findAndRemove(sheet: string, condi: RowData): Promise<void> {
        await this.dexie.table(sheet).where(condi).delete();
    }
    async findAndUpdate(sheet: string, condi: RowData, delta: RowData): Promise<void> {
        await this.dexie.table(sheet).where(condi).modify(delta);
    }
    async getDeltaChanges(sheets: string[] = []): Promise<Change[]> {
        return this.changes.filter((x)=>(sheets.indexOf(x.sheet)!=-1))
    }
    async clearChanges(): Promise<void> {
        this.changes = [];
    }

}

export default WebIndexedDB;
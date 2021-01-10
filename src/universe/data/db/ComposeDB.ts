import {DBType} from "./DBType";
import {IUniverseDB,  Change, RowData } from "./IUniverseDB";
import {LokiDB} from "./LokiDB";
import {WorkerWebIndexedDB} from "./WorkerIndexedDB";

type DBDefine = {
    name:string,
    db?:DBType,
    [key:string]:any
}

type DBConfig = {
    db:DBType,
    options:any
}[];


class ComposeDB implements IUniverseDB{
    private defines:DBDefine[];
    private define = new Map<string,DBType>();

    private config : DBConfig;
    private dbs = new Map<DBType,IUniverseDB>();

    constructor(dbconfig:DBConfig,defines:DBDefine[]){
        this.defines = defines;

        this.config = dbconfig;

        this.initDefines();
        this.initDbs();
    }
    db(type : DBType){
        if(!this.dbs.has(type))
            throw new Error("this db doesn't exist");
        
        return this.dbs.get(type) as IUniverseDB;
    }
    private initDbs(){
        this.dbs.set(DBType.IndexedDB,new WorkerWebIndexedDB(this.getConfig(DBType.IndexedDB)));
        this.dbs.set(DBType.LokiDB,new LokiDB());
        
    }
    private getConfig(dbtype:DBType) : any{
        let db = this.config.find((x)=>{
            return x.db == dbtype
        });
        if(!db)
            return;
        return db.options;
    }
    private initDefines(){
        for(let def of this.defines)
            this.define.set(def.name,def.db || DBType.LokiDB);
    }
    private getDefType(defname:string){
        if(!this.define.has(defname))
            return;

        let type = this.define.get(defname) as DBType;
        return type;
    }
    private getDB(defname:string){
        let type = this.getDefType(defname);
        if(!type)
            return this.dbs.get(DBType.LokiDB) as IUniverseDB

        return this.db(type);
    }
    async open(): Promise<void> {
        for(let db of this.dbs.values()){
            await db.open();
        }
    }
    createSheet(sheet: string, indexes?: string[], column?: string[]): Promise<void> {
        return this.getDB(sheet).createSheet(sheet,indexes,column);
    }
    find(sheet: string, condi: RowData): Promise<RowData[]> {
        return this.getDB(sheet).find(sheet,condi);
    }
    findOne(sheet: string, condi: RowData): Promise<RowData> {
        return this.getDB(sheet).findOne(sheet,condi);
    }
    insertMany(sheet: string, rows: RowData[]): Promise<void> {
        return this.getDB(sheet).insertMany(sheet,rows);
    }
    insertOne(sheet: string, row: RowData): Promise<string> {
        return this.getDB(sheet).insertOne(sheet,row);
    }
    has(sheet: string, condi: RowData): Promise<boolean> {
        return this.getDB(sheet).has(sheet,condi);
    }
    findAndRemove(sheet: string, condi: RowData): Promise<void> {
        return this.getDB(sheet).findAndRemove(sheet,condi);
    }
    findAndUpdate(sheet: string, condi: RowData, delta: RowData): Promise<void> {
        return this.getDB(sheet).findAndUpdate(sheet,condi,delta);
    }
  
    private getRalatedDBMap(sheets?: string[]){
        if(!sheets)
            sheets = this.defines.map((x)=>(x.name));
        let map = new Map<DBType,string[]>();


        for(let s of sheets){
            let db = this.getDefType(s) || DBType.LokiDB;
            let arr = map.get(db) || [];;
            arr.push(s);
            map.set(db,arr);
        }

        return map;
    }
    async getSheetChanges(sheet:string): Promise<Change[]> {
        let map = this.getRalatedDBMap([sheet]);
        let res = [];
        for(let [type,tables] of map.entries()){
            let db = this.dbs.get(type) as IUniverseDB;
            for(let sheet of tables)
                res.push(...await db.getSheetChanges(sheet));
        }
        return res;
    }
    async getCompChanges(comp:string){
        let ret = [];
        for(let db of this.dbs.values())
            ret.push(...await db.getCompChanges(comp));
        return ret;
    }

    async clearChanges(): Promise<void> {
        let map = this.getRalatedDBMap();

        for(let [type,tables] of map.entries()){
            let db = this.dbs.get(type) as IUniverseDB;
            await db.clearChanges();
        }
    }
    

}

export {DBConfig};
export {ComposeDB};

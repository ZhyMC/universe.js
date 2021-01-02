import DBType from "./DBType";
import IUniverseDB, { Change, RowData } from "./IUniverseDB";
import LokiDB from "./LokiDB";
import WorkerWebIndexedDB from "./WorkerIndexedDB";

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
    async getDeltaChanges(sheets?: string[]): Promise<Change[]> {

        let res = [];
        for(let db of this.dbs.values()){
            res.push(...await db.getDeltaChanges(sheets));
        }
        return res;
    }
    async clearChanges(): Promise<void> {
        for(let db of this.dbs.values())
            await db.clearChanges();
    }
    

}

export {DBConfig};
export default ComposeDB;

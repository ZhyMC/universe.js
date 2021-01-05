import {RPCWorker} from "../../../utils/RPCWorker";
import {IUniverseDB,  Change, RowData } from "./IUniverseDB";
import IndexedDBWorker from "../../../worker/dist/indexeddb.worker";

class WorkerWebIndexedDB implements IUniverseDB{
    private worker : RPCWorker;
    private stores :{[key:string]:string} = {};
    private changes : Change[] = [];

    constructor(worker_url:string){
        this.worker = new RPCWorker(new Worker(URL.createObjectURL(new Blob([IndexedDBWorker]))));
    }
    async open() : Promise<void>{
        return this.worker.send("open");
    };
    async createSheet(sheet: string, indexes: string[] = [], column: string[] = []): Promise<void> {
        return this.worker.send("createSheet",[sheet,indexes,column]);
    }
    find(sheet: string, condi: RowData): Promise<RowData[]> {
        return this.worker.send("find",[sheet,condi]);
    }
    findOne(sheet: string, condi: RowData): Promise<RowData> {
        return this.worker.send("findOne",[sheet,condi]);
    }
    async insertMany(sheet: string, rows: RowData[]): Promise<void> {
        return this.worker.send("insertMany",[sheet,rows]);
    }
    async insertOne(sheet: string, row: RowData): Promise<string> {
        return this.worker.send("insertOne",[sheet,row]);
    }
    async has(sheet: string, condi: RowData): Promise<boolean> {
        return this.worker.send("has",[sheet,condi]);
    }
    async findAndRemove(sheet: string, condi: RowData): Promise<void> {
        return this.worker.send("findAndRemove",[sheet,condi]);
    }
    async findAndUpdate(sheet: string, condi: RowData, delta: RowData): Promise<void> {
        return this.worker.send("findAndUpdate",[sheet,condi,delta]);
    }
    async getDeltaChanges(sheets: string[] = []): Promise<Change[]> {
        return this.worker.send("getDeltaChanges",[sheets]);
    }
    async clearChanges(): Promise<void> {
        return this.worker.send("clearChanges",[]);
    }

}

export {WorkerWebIndexedDB};
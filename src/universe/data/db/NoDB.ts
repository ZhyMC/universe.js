import IUniverseDB, { Change, FindCondition, RowData } from "./IUniverseDB";

class NoDB implements IUniverseDB{
    async open(){
        throw new Error("Method not implemented.");
    }
    createSheet(sheet: string, indexes?: string[], column?: string[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(sheet: string, condi: RowData): Promise<RowData[]> {
        throw new Error("Method not implemented.");
    }
    findOne(sheet: string, condi: RowData): Promise<RowData> {
        throw new Error("Method not implemented.");
    }
    insertMany(sheet: string, row: RowData[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    insertOne(sheet: string, rows: RowData): Promise<string> {
        throw new Error("Method not implemented.");
    }
    findAndRemove(sheet: string, condi: RowData): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAndUpdate(sheet: string, condi: RowData, delta: RowData): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getDeltaChanges(sheets?: string[]):Promise<Change[]>{
        throw new Error("Method not implemented.");
    }
    async has(sheet:string,condi:FindCondition) :Promise<boolean>{
        throw new Error("Method not implemented.");
    }
    async clearChanges(){
        throw new Error("Method not implemented.");
    }

}

export default NoDB;
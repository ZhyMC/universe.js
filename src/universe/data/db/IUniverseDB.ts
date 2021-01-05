

export type RowData ={
    [key:string] : any
}
export type FindCondition = RowData;

export type Change = {
    sheet : string,
    operation : "I" | "U" | "D",
    row : RowData
}
export interface IUniverseDB{
    
    open(): Promise<void>
    createSheet(sheet:string,indexes?:string[],column?:string[]) : Promise<void>;
    find(sheet:string,condi : FindCondition) : Promise<Array<RowData>>;
    findOne(sheet:string,condi : FindCondition) : Promise<RowData>;

    insertMany(sheet:string,rows : Array<RowData>) : Promise<void>;
    insertOne(sheet:string,row : RowData) : Promise<string>;
    has(sheet:string,condi? : FindCondition) : Promise<boolean>;
    findAndRemove(sheet:string,condi:FindCondition) : Promise<void>;
    findAndUpdate(sheet:string,condi:FindCondition,delta:RowData) : Promise<void>;
    getDeltaChanges(sheets?:Array<string>) : Promise<Array<Change>>
    clearChanges() : Promise<void>;
    
}

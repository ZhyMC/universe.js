

type RowData ={
    [key:string] : any
}
type FindCondition = RowData;

type Change = {
    sheet : string,
    operation : "I" | "U" | "D",
    row : RowData
}
interface IUniverseDB{
    
    createSheet(sheet:string,indexes?:string[],column?:string[]) : Promise<void>;
    find(sheet:string,condi : FindCondition) : Promise<Array<RowData>>;
    findOne(sheet:string,condi : FindCondition) : Promise<RowData>;
    insert(sheet:string,row : Array<RowData>) : Promise<void>;
    insertOne(sheet:string,rows : RowData) : Promise<string>;
    has(sheet:string,condi : FindCondition) : Promise<boolean>;
    findAndRemove(sheet:string,condi:FindCondition) : Promise<void>;
    findAndUpdate(sheet:string,condi:FindCondition,delta:RowData) : Promise<void>;
    getDeltaChanges(sheets?:Array<string>) : Array<Change>
    clearChanges() : void;
    
}

export {Change,RowData,FindCondition};
export default IUniverseDB;
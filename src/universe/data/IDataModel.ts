
type Schema = {key:string,def_value:object}[];

interface IDataModel{
    key:string;
    getIndice() : string[];
    getName() : string;
    getSchema() : Schema;
}

export default IDataModel;

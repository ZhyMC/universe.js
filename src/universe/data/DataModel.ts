import {DBType} from "./db/DBType";

type DataModelProperty = {
    default : any,
    [key:string]:any
}

export type DataModel ={
    name:string,
    db?:DBType,
    indice?:string[],
    prop:{
        [key:string]:DataModelProperty
    }
};

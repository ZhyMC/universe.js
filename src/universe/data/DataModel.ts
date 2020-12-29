
type DataModelProperty = {
    default : any,
    [key:string]:any
}

type DataModel ={
    name:string,
    indice?:string[],
    prop:{
        [key:string]:DataModelProperty
    }
};

export default DataModel;
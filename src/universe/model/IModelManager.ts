import IModel from "./IModel";
import LokiDB from "lokijs";

type DBModelLine = {
    key:string
};


interface IModelManager{
    readonly db : LokiDB;
    setEnabled() : void;
    addModel(model:IModel) : void;
    getModel(name:string) : IModel;
}

export default IModelManager;

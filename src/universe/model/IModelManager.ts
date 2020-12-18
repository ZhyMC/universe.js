import IModel from "./IModel";

interface IModelManager{
    setEnabled() : void;
    add(model:IModel) : void;
    get(name:string) : IModel;
}

export default IModelManager;

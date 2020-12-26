import IModelManager from "../model/IModelManager";
import IController from "./IController";
import IViewObjectManager from "../../view/viewobject/IViewObjectManager";
import MaterialContainer from "../../view/MaterialContainer";

abstract class Controller implements IController{
    protected model: IModelManager;
    protected viewobj: IViewObjectManager;
    protected mtl : MaterialContainer;
    
    constructor(viewobj:IViewObjectManager,modelmanager:IModelManager,mtlcontainer:MaterialContainer){
        this.model = modelmanager;
        this.viewobj = viewobj;
        this.mtl = mtlcontainer;
    }
    getName(){
        return this.constructor.name;
    }
    abstract start():void;
    abstract doTick(tick:number):void;
}

export default Controller;
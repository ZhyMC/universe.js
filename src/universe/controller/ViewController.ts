import IController from "./IController";
import IViewObjectManager from "../../view/viewobject/IViewObjectManager";
import MaterialContainer from "../../view/MaterialContainer";
import LokiDB from "lokijs";

abstract class Controller implements IController{
    protected db: LokiDB;
    protected viewobj: IViewObjectManager;
    protected mtl : MaterialContainer;
    
    constructor(viewobj:IViewObjectManager,db:LokiDB,mtlcontainer:MaterialContainer){
        this.db = db;
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
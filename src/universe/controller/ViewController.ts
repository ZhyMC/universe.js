import IController from "./IController";
import IViewObjectManager from "../../view/viewobject/IViewObjectManager";
import MaterialContainer from "../../view/MaterialContainer";
import LokiDB from "lokijs";
import DataWatcher from "../data/DataWatcher";

abstract class ViewController implements IController{
    protected db: LokiDB;
    protected viewobj: IViewObjectManager;
    protected mtl : MaterialContainer;
    protected watcher : DataWatcher;
    
    constructor(viewobj:IViewObjectManager,mtlcontainer:MaterialContainer,watcher:DataWatcher){
        this.viewobj = viewobj;
        this.mtl = mtlcontainer;
        this.watcher = watcher;
        this.db = this.watcher.getDB();

    }
    getName(){
        return this.constructor.name;
    }
    abstract start():void;
    abstract doTick(tick:number):void;
}

export default ViewController;
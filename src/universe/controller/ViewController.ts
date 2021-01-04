import IController from "./IController";
import IViewObjectManager from "../../view/viewobject/manager/IViewObjectManager";
import MaterialManager from "../../view/MaterialManager";
import IUniverseDB from "../data/db/IUniverseDB";

abstract class ViewController implements IController{
    protected db: IUniverseDB;
    protected viewobj: IViewObjectManager;
    protected mtl : MaterialManager;
    
    constructor(viewobj:IViewObjectManager,mtlcontainer:MaterialManager,db:IUniverseDB){
        this.viewobj = viewobj;
        this.mtl = mtlcontainer;
        this.db = db;

    }
    getName(){
        return this.constructor.name;
    }
    abstract start():Promise<void>;
    abstract doTick(tick:number):Promise<void>;
}

export default ViewController;
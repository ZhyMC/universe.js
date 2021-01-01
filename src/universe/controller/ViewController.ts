import IController from "./IController";
import IViewObjectManager from "../../view/viewobject/IViewObjectManager";
import MaterialContainer from "../../view/MaterialContainer";
import IUniverseDB from "../data/db/IUniverseDB";

abstract class ViewController implements IController{
    protected db: IUniverseDB;
    protected viewobj: IViewObjectManager;
    protected mtl : MaterialContainer;
    
    constructor(viewobj:IViewObjectManager,mtlcontainer:MaterialContainer,db:IUniverseDB){
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
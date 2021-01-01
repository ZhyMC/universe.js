import ICommanderManager from "../command/ICommandManager";
import IController from "./IController";
import IUniverseDB from "../data/db/IUniverseDB";

abstract class Controller implements IController{
    protected db: IUniverseDB;
    protected commander: ICommanderManager;
    constructor(commander:ICommanderManager,db:IUniverseDB){
        this.db = db;
        this.commander = commander;
    }
    getName(){
        return this.constructor.name;
    }
    abstract start():Promise<void>;
    abstract doTick(tick:number):Promise<void>;
}

export default Controller;
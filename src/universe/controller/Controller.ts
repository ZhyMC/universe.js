import {ICommandManager} from "../command/ICommandManager";
import {IController} from "./IController";
import {IUniverseDB} from "../data/db/IUniverseDB";

export abstract class Controller implements IController{
    protected db: IUniverseDB;
    protected commander: ICommandManager;
    constructor(commander:ICommandManager,db:IUniverseDB){
        this.db = db;
        this.commander = commander;
    }
    getName(){
        return this.constructor.name;
    }
    abstract start():Promise<void>;
    abstract doTick(tick:number):Promise<void>;
}

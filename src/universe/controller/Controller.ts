import ICommanderManager from "../command/ICommandManager";
import IController from "./IController";
import LokiDB from "lokijs";

abstract class Controller implements IController{
    protected db: LokiDB;
    protected commander: ICommanderManager;
    constructor(commander:ICommanderManager,db:LokiDB){
        this.db = db;
        this.commander = commander;
    }
    getName(){
        return this.constructor.name;
    }
    abstract start():void;
    abstract doTick(tick:number):void;
}

export default Controller;
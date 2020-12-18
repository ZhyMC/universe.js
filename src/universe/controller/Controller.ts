import ICommanderManager from "../command/ICommandManager";
import IModelManager from "../model/IModelManager";
import IController from "./IController";

abstract class Controller implements IController{
    protected model: IModelManager;
    protected commander: ICommanderManager
    constructor(commander:ICommanderManager,modelmanager:IModelManager){
        this.model = modelmanager;
        this.commander = commander;
    }
    getName(){
        return this.constructor.name;
    }
    abstract start():void;
    abstract doTick(tick:number):void;
}

export default Controller;
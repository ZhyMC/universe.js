import IModelManager from "../model/IModelManager";
import IController from "./IController";
import Three from "three";

abstract class Controller implements IController{
    protected model: IModelManager;
    protected scene: Three.Scene
    constructor(scene:Three.Scene,modelmanager:IModelManager){
        this.model = modelmanager;
        this.scene = scene;
    }
    getName(){
        return this.constructor.name;
    }
    abstract start():void;
    abstract doTick(tick:number):void;
}

export default Controller;
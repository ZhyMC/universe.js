import IModelManager from "../model/IModelManager";
import Controller from "./Controller";
import IController from "./IController";

class Controllers implements IController{
    private controllers : IController[];
    constructor(controllers:IController[]){
        this.controllers = controllers;
    }
    getName(){
        return "ControllerManager";
    }
    start(){
        this.controllers.forEach((c)=>{
            c.start();
        })
    }
    doTick(tick:number){
        this.controllers.forEach((c)=>{
            c.doTick(tick);
        })
    }
}

export default Controllers;
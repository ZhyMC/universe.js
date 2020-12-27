import IController from "./IController";

class Controllers implements IController{
    private controllers : IController[] = [];
    constructor(){
        
    }
    addController(controller : IController){
        this.controllers.push(controller);
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
        let errs : any[] = [];
        this.controllers.forEach((c)=>{
            try{
                c.doTick(tick);
            }catch(err){
                errs.push(err);
            }
        });
    
        errs.forEach((err)=>{
            throw err;
        })
    }
}

export default Controllers;
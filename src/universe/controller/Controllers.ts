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
    async start(){
        for(let c of this.controllers)
            await c.start();
    }
    async doTick(tick:number){
        let errs : any[] = [];

        for(let c of this.controllers){
            try{
                await c.doTick(tick);
            }catch(err){
                errs.push(err);
            }
        }
    
        errs.forEach((err)=>{
            throw err;
        })
    }
}

export default Controllers;
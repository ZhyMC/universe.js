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
                let time_start = new Date().getTime();
                await c.doTick(tick);
                let time_end = new Date().getTime();
                let delta=time_end - time_start;
                if(delta>10)
                console.debug("[universe][tick]",c.getName(),delta);
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
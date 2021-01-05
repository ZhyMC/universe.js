import {IController} from "./IController";

export class Controllers implements IController{
    private controllers : IController[] = [];
    private isAsyncs = new Map<IController,boolean>();
    constructor(){
        
    }
    addController(controller : IController){
        this.controllers.push(controller);
    }
  

    private isAsync(controller:IController){
        if(!this.isAsyncs.has(controller))
            return false;
        return this.isAsyncs.get(controller) as boolean;
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
        let asyncs : IController[] = [];
        for(let c of this.controllers){
            try{
                let time_start = new Date().getTime();
                if(this.isAsync(c))
                    asyncs.push(c);
                else
                    await c.doTick(tick);

                let time_end = new Date().getTime();
                let delta=time_end - time_start;
                if(delta>10)
                console.debug("[universe][tick]",c.getName(),delta);
            }catch(err){
                errs.push(err);
            }
        }
        await Promise.all(asyncs.map(a=>a.doTick(tick)));
    
        errs.forEach((err)=>{
            throw err;
        })
    }
}

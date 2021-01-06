import * as Universe from "universe.js";

class PlayerController extends Universe.Controller{
    async start(){
        this.db.insertOne("Player",{x:0,y:3,z:0});
    }
    async doTick(tick:number){
        
        if(!await this.db.has("Player"))return;
        let player = await this.db.findOne("Player",{});

        let offx = 0;
        let offz = 0;
        if(this.commander.isActive("a")){
            offx += -0.2;
        }
        if(this.commander.isActive("d")){
            offx += +0.2;
        }
        if(this.commander.isActive("w")){
            offz += -0.2;
        }
        if(this.commander.isActive("s")){
            offz += +0.2;
            
        }
        if(offx != 0 || offz != 0)
         await this.db.findAndUpdate("Player",{},{x:player.x+offx,z:player.z+offz});
    }

}

export {PlayerController};
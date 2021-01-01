import * as Universe from "universe.js";
import PlayerModel from "../model/PlayerModel";

class PlayerController extends Universe.Controller{
    async start(){
        let model = new PlayerModel(this.db);
        model.add();
    }
    async doTick(tick:number){
        let model = new PlayerModel(this.db);
        if(!(await model.has()))return;
        let player = await model.find();

        if(this.commander.isActive("a")){
            model.set({x:player.x-0.1});
        }else if(this.commander.isActive("d")){
            model.set({x:player.x+0.1});
        }else if(this.commander.isActive("w")){
            model.set({z:player.z+0.1});
            
        }else if(this.commander.isActive("s")){
            model.set({z:player.z-0.1});
            
        }
    }

}

export default PlayerController;
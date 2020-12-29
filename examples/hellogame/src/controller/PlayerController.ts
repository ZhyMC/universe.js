import * as Universe from "universe.js";
import PlayerModel from "../model/PlayerModel";

class PlayerController extends Universe.Controller{
    start(){
        let model = new PlayerModel(this.db);
        model.add();
    }
    doTick(tick:number){
        let model = new PlayerModel(this.db);
        if(!model.has())return;
        let player = model.find();

        if(this.commander.isActive("a")){
            player.x = player.x - 0.1;
        }else if(this.commander.isActive("d")){
            player.x = player.x + 0.1;
        }else if(this.commander.isActive("w")){
            player.z = player.z + 0.1;
            
        }else if(this.commander.isActive("s")){
            player.z = player.z - 0.1;
            
        }
    }

}

export default PlayerController;
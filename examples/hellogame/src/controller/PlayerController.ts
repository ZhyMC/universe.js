import * as Universe from "universe.js";
import PlayerModel from "../model/PlayerModel";

class PlayerController extends Universe.Controller{
    start(){
    }
    doTick(tick:number){
        if(tick<100)return;
        let p = new PlayerModel(this.db);
        if(tick == 100){
            p.add();
    
        }
        if(tick == 200){
            p.remove();
        }

        if(!p.has())return;

        let player = p.find();

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
import * as Universe from "universe.js";
import PlayerModel from "../model/PlayerModel";
import PointLightModel from "../model/PointLightModel";

class PlayerController extends Universe.Controller{
    async start(){
        let model = new PlayerModel(this.db);
        model.add({x:0,y:1.5,z:0});
        new PointLightModel("playerlight",this.db).add({x:0,y:0,z:0});
    }
    async doTick(tick:number){
        let model = new PlayerModel(this.db);
        if(!(await model.has()))return;
        let player = await model.find();

        let offx = 0;
        let offz = 0;
        if(this.commander.isActive("a")){
            offx += -0.1;
        }
        if(this.commander.isActive("d")){
            offx += +0.1;
        }
        if(this.commander.isActive("w")){
            offz += -0.1;
        }
        if(this.commander.isActive("s")){
            offz += +0.1;
            
        }
        model.set({x:player.x+offx,z:player.z+offz});
    }

}

export default PlayerController;
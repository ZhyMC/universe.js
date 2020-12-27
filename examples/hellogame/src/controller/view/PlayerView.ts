import * as Universe from "universe.js";
import PlayerModel from "../../model/PlayerModel";

class PlayerView extends Universe.ViewController{

    start(){
    
    }
    doTick(){
        let model = new PlayerModel(this.db);
        console.log(model.has());
        this.viewobj.ensure("player",model.has(),()=>new Universe.ImageViewObject());

        if(!model.has())return;


        let player = this.viewobj.query("player") as Universe.ImageViewObject;
        player.setImageMtl(this.mtl.getSpriteMtl("player"));

        let pos = model.getPosition();
        player.getObject3D().position.set(pos.x,pos.y,pos.z);
    }
    
}

export default PlayerView;

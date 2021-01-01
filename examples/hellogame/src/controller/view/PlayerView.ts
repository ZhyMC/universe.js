import * as Universe from "universe.js";
import PlayerModel from "../../model/PlayerModel";

class PlayerView extends Universe.ViewController{

    async start(){
    
    }
    async doTick(){
        for(let change of this.db.getDeltaChanges(["Player"])){

            let model = new PlayerModel(this.db);
            this.viewobj.ensure("player",await model.has(),()=>new Universe.ImageViewObject());
            if(!model.has())return;
            let player = this.viewobj.query("player") as Universe.ImageViewObject;
            player.setImageMtl(this.mtl.getSpriteMtl("player"));
    
            let pos = await model.getPosition();
            player.getObject3D().position.set(pos.x,pos.y,pos.z);
        
        };
        

        
    }
    
}

export default PlayerView;

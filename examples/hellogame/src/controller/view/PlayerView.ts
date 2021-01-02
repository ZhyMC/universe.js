import * as Universe from "universe.js";
import PlayerModel from "../../model/PlayerModel";
import * as Three from "three";
import { Vector3 } from "three";
import PointLightModel from "../../model/PointLightModel";

class PlayerView extends Universe.ViewController{

    async start(){            
//(light.getObject3D() as Three.PointLight).position.copy(o.position);

    }
    
    private async tickLookAtCamera(player:Three.Object3D,camera:Three.Object3D){
        player.lookAt(camera.position.clone());
    }
    private async tickTexture(player:Universe.ImageViewObject){
        player.setImageMtl(this.mtl.getSpriteMtl("player"));
    
    }
    private async tickPosition(player:Three.Object3D,pos:Three.Vector3){
        player.position.copy(pos);
    }
    private async tickPlayer(){
        let model = new PlayerModel(this.db);
        let has = await model.has();


        if(!has)
            return;
        
        let player = await this.viewobj.ensure("player",has,()=>new Universe.ImageViewObject({x:1.2,y:1.2})) as Universe.ImageViewObject;
        let light = await this.viewobj.ensure("playerlight",has,()=>new Universe.PointLightViewObject()) as Universe.PointLightViewObject;
        let camera = await this.viewobj.find("camera");

        await this.tickLookAtCamera(player.getObject3D(),camera);
        await this.tickTexture(player);
        await this.tickPosition(player.getObject3D(),await model.getPosition());

    }
    async doTick(){
        let changes = await this.db.getDeltaChanges(["Player"]);
        for(let change of changes){

            await this.tickPlayer();
            

        };
        

        
    }
    
}

export default PlayerView;

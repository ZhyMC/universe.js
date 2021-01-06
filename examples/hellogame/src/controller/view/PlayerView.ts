import * as Universe from "universe.js";
import {SpriteViewObject,PointLightViewObject} from "universe.js";
import * as Three from "three";


class PlayerView extends Universe.ViewController{

    async start(){            

    }
    private async tickLight(player:SpriteViewObject,light:PointLightViewObject){
        light.o3.intensity = 1;

        light.o3.position.set(player.o3.position.x,player.o3.position.y+5,player.o3.position.z)
    }
    
    private async tickLookAtCamera(player:SpriteViewObject,camera:Three.Object3D){
        player.o3.lookAt(camera.position.clone());
    }
    private async tickTexture(player:SpriteViewObject){
        player.setImageMtl(this.mtl.getSpriteMtl("player"));
    
    }
    private async tickPosition(player:SpriteViewObject,pos:Three.Vector3){
        player.o3.position.copy(pos);
    }
    private async tickPlayer(){

        let has = await this.db.has("Player");
        if(!has)
            return;
        

        let player = await this.viewobj.ensure("player",has,()=>new SpriteViewObject({x:2.5,y:2.5}));
        
        let light = await this.viewobj.ensure("playerlight",has,()=>new PointLightViewObject());
        let camera = await this.viewobj.find("camera");
        let {x,y,z} = await this.db.findOne("Player",{})

        
        await this.tickTexture(player);
        await this.tickPosition(player,new Three.Vector3(x,y,z));
        await this.tickLookAtCamera(player,camera);
        await this.tickLight(player,light);

    }
    async doTick(){
        let changes = await this.db.getDeltaChanges(["Player"]);
        
        for(let change of changes){

            await this.tickPlayer();
            

        };
        

        
    }
    
}

export {PlayerView};

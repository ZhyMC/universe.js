import {SpriteViewObject,PointLightViewObject,TextViewObject} from "universe.js";

import * as Universe from "universe.js";
import * as Three from "three";
import { Change } from "../../../../../dist/universe/data/db";

class PlayerView extends Universe.ViewController{

    async start(){            

    }
  
    private async tickLight(player:SpriteViewObject,light:PointLightViewObject){
        light.o3.intensity = 1;
        light.o3.position.set(player.o3.position.x,player.o3.position.y+5,player.o3.position.z)
    }
    
    private async tickLookAtCamera(player:SpriteViewObject){
        let camera = await this.viewobj.find("camera");
        player.o3.lookAt(camera.position.clone());
    }
    private async tickTexture(player:SpriteViewObject){
        player.setImageMtl(this.mtl.getSpriteMtl("player"));
    
    }
    private async tickPosition(player:SpriteViewObject,pos:Three.Vector3){
        player.o3.position.copy(pos);
    }
    private async tickPlayer(change:Change){
        
        let player = await this.viewobj.ensure(change.unikey,change.is,()=>new SpriteViewObject())        
        let light = await this.viewobj.ensure(`${change.unikey}#light`,change.is,()=>new PointLightViewObject());

        if(!player)
            return;
        
        await this.tickTexture(player);
        await this.tickPosition(player,new Three.Vector3(change.row.x,change.row.y,change.row.z));
        await this.tickLookAtCamera(player);
        await this.tickLight(player,light);


        let text=await this.viewobj.ensure("hellotext",true,()=>{
            return new TextViewObject();
        })

        text.setText(`(${change.row.x.toFixed(2)},${change.row.z.toFixed(2)})`);

    }
    async doTick(tick:number){
        let changes = await this.db.getSheetChanges("Player");
        
        for(let change of changes){
            await this.tickPlayer(change);
        };
        


        
    }
    
}

export {PlayerView};

import * as Three from "three";
import {ThreeViewObject} from "./ThreeViewObject";

class SpriteViewObject extends ThreeViewObject{
    private sprite : Three.Mesh;
    private scale:{x:number,y:number} = {x:1.5,y:1.5};
    constructor(){
        super();

        this.sprite = new Three.Mesh(new Three.PlaneBufferGeometry());
        this.sprite.castShadow = true;

    }
    setScale(scale:{x:number,y:number}){
        this.scale = scale;
    }
    setImageMtl(mtl:Three.Material){
        this.sprite.material = mtl;
        this.sprite.scale.set(this.scale.x,this.scale.y,1);
    }
    get o3() : Three.Object3D{
        return this.sprite;
    }
}

export {SpriteViewObject};
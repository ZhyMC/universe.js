import * as Three from "three";
import {IViewObject} from "./define/IViewObject";

class SpriteViewObject implements IViewObject{
    private sprite : Three.Mesh;
    private scale:{x:number,y:number};
    constructor(scale:{x:number,y:number}){
        this.sprite = new Three.Mesh(new Three.PlaneBufferGeometry());
        this.sprite.castShadow = true;

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
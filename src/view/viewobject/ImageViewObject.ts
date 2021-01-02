import * as Three from "three";
import { Mesh } from "three";
import IViewObject from "./IViewObject";

class ImageViewObject implements IViewObject{
    private sprite : Three.Mesh;
    private scale:{x:number,y:number};
    constructor(scale:{x:number,y:number}){
        this.sprite = new Mesh(new Three.PlaneBufferGeometry());
        this.scale = scale;
    }
    async load(){
        
    }
    setImageMtl(mtl:Three.Material){
        this.sprite.material = mtl;
        this.sprite.scale.set(this.scale.x,this.scale.y,1);
    }
    getObject3D() : Three.Object3D{
        return this.sprite;
    }
}

export default ImageViewObject;
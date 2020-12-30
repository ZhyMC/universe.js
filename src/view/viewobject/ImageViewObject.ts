import * as Three from "three";
import IViewObject from "./IViewObject";

class ImageViewObject implements IViewObject{
    private sprite : Three.Sprite = new Three.Sprite();
    constructor(){
        this.sprite = new Three.Sprite();
    }
    setImageMtl(mtl:Three.SpriteMaterial){
        this.sprite.material = mtl;
    }
    getObject3D() : Three.Object3D{
        return this.sprite;
    }
}

export default ImageViewObject;
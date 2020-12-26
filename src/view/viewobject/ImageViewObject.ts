import * as Three from "three";
import HTMLImageLoader from "../../utils/HTMLImageLoader";
import IViewObject from "./IViewObject";

class ImageViewObject implements IViewObject{
    private sprite : Three.Sprite = new Three.Sprite();
    constructor(){

    }
    async setImageMtl(mtl:Three.SpriteMaterial){
        this.sprite = new Three.Sprite(mtl);
    }
    getObject3D() : Three.Object3D{
        return this.sprite;
    }
}

export default ImageViewObject;
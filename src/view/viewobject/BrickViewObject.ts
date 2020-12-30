import * as Three from "three";
import IViewObject from "./IViewObject";

class BrickViewObject implements IViewObject{
    private brick : Three.BoxBufferGeometry;
    private obj : Three.Mesh;
    static geometry = new Three.BoxBufferGeometry(1,1,1);

    constructor(){

        this.brick = BrickViewObject.geometry;
        this.obj = new Three.Mesh(this.brick);
    }
    setImageMtl(mtl:Three.MeshBasicMaterial){
        this.obj.material = [mtl,mtl,mtl,mtl,mtl,mtl];
    }
    getObject3D() : Three.Object3D{
        return this.obj;
    }    

}

export default BrickViewObject;
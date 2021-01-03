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
    async load(){

    }
    setImageMtl(mtl:Three.MeshStandardMaterial){
        this.obj.material = [mtl,mtl,mtl,mtl,mtl,mtl];
    }

    get o3(){
        return this.getObject3D();
    }
    getObject3D() : Three.Object3D{
        return this.obj;
    }    

}

export default BrickViewObject;
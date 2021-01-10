import * as Three from "three";
import {ThreeViewObject} from "../../view/viewobject/3dobject/ThreeViewObject";

class BrickViewObject extends ThreeViewObject{
    private brick : Three.BoxBufferGeometry;
    private obj : Three.Mesh;
    static geometry = new Three.BoxBufferGeometry(1,1,1);

    constructor(){
        super();
        this.brick = BrickViewObject.geometry;
        this.obj = new Three.Mesh(this.brick);
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

export {BrickViewObject};
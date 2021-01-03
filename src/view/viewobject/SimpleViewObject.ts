import * as Three from "three";
import IViewObject from "./IViewObject"
class SimpleViewObject implements IViewObject{
    private obj : Three.Object3D;
    constructor(obj : Three.Object3D){
        this.obj = obj;
    }
    get o3(){
        return this.getObject3D();
    }
    getObject3D(){
        return this.obj;
    }
    async load(){

    }
    

}

export default SimpleViewObject;

import * as Three from "three";
import IViewObject from "./define/IViewObject"
class SimpleViewObject implements IViewObject{
    private obj : Three.Object3D;
    constructor(obj : Three.Object3D){
        this.obj = obj;
    }
    get o3(){
        return this.obj;
    }    

}

export default SimpleViewObject;

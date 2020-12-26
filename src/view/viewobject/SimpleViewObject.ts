import * as Three from "three";
import IViewObject from "./IViewObject"
class NormalViewObject implements IViewObject{
    private obj : Three.Object3D;
    constructor(obj : Three.Object3D){
        this.obj = obj;
    }
    async load(){

    }
    getObject3D(){
        return this.obj;
    }

}

export default NormalViewObject;

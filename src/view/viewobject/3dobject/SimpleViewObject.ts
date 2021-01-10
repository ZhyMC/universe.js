import * as Three from "three";
import {IViewObject} from "../IViewObject"
import {ThreeViewObject} from "./ThreeViewObject";

class SimpleViewObject extends ThreeViewObject{
    private obj : Three.Object3D;
    constructor(obj : Three.Object3D){
        super();
        this.obj = obj;
    }
    get o3(){
        return this.obj;
    }    

}

export {SimpleViewObject};

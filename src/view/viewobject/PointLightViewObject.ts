import * as Three from "three";
import IViewObject from "./IViewObject";

class PointLightViewObject implements IViewObject{
    private light : Three.Light;

    constructor(){
        this.light = new Three.PointLight();

    }
    async load(){

    }
    getObject3D() : Three.Object3D{
        return this.light;
    }    

}

export default PointLightViewObject;
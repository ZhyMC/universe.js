import * as Three from "three";
import IViewObject from "./IViewObject";

class PointLightViewObject implements IViewObject{
    private light : Three.PointLight;

    constructor(){
        this.light = new Three.PointLight();

    }
    async load(){

    }
    get o3(){
        return this.getObject3D();
    }
    getObject3D() : Three.PointLight{
        return this.light;
    }    

}

export default PointLightViewObject;
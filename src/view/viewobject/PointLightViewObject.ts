import * as Three from "three";
import {IViewObject} from "./define/IViewObject";

class PointLightViewObject implements IViewObject{
    private light : Three.PointLight;

    constructor(){
        this.light = new Three.PointLight();
        this.light.castShadow = true;
    }
    get o3() : Three.PointLight{
        return this.light;
    }    

}

export {PointLightViewObject};
import * as Three from "three";
import {IViewObject} from "../IViewObject";
import {ThreeViewObject} from "./ThreeViewObject";

class PointLightViewObject extends ThreeViewObject{
    private light : Three.PointLight;

    constructor(){
        super();
        this.light = new Three.PointLight();
        this.light.castShadow = true;
    }
    get o3() : Three.PointLight{
        return this.light;
    }    

}

export {PointLightViewObject};
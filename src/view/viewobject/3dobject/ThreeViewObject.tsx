import * as React from "react";
import * as Three from "three";
import { IViewObject } from "../IViewObject";

export abstract class ThreeViewObject implements IViewObject{
    readonly is3DObject = true;
    readonly isUIObject = false;

    get ui(){
        return <div></div>;
    }
    abstract get o3() : Three.Object3D;
}
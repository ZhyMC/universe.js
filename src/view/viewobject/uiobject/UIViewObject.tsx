import * as React from "react";
import * as Three from "three";
import * as MobxReact from "mobx-react";
import { IViewObject } from "../IViewObject";

export abstract class UIViewObject implements IViewObject{
    readonly is3DObject = false;
    readonly isUIObject = true;

    get o3(){
        return new Three.Object3D();
    }
    abstract get ui() : React.ReactElement;
   
}
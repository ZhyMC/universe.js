import * as Three from "three";
import * as React from "react";

interface IViewObject{
    readonly is3DObject:boolean;
    readonly o3:Three.Object3D;

    readonly isUIObject:boolean;
    readonly ui:React.ReactElement;
}

export {IViewObject};

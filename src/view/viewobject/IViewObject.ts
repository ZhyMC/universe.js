import * as Three from "three";

interface IViewObject{
    readonly o3:Three.Object3D;

    getObject3D() : Three.Object3D;
}

export default IViewObject;

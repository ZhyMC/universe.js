import IViewObject from "./IViewObject";
import * as Three from "three"

interface IViewObjectManager{

    ensure(key:string,exists:boolean,factory:()=>Promise<IViewObject> | IViewObject):any;
    set(key:string,vobj:IViewObject):void;
    remove(key:string):void;
    has(key:string):boolean;

    query(key:string):IViewObject;
    find(key:string):Three.Object3D;
}

export default IViewObjectManager;
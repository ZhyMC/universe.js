import {IViewObject} from "../define/IViewObject";
import * as Three from "three"

export interface IViewObjectManager{

    ensure<T extends IViewObject>(key:string,exists:boolean,factory:()=>Promise<T> | T) : Promise<T>;
    set(key:string,vobj:IViewObject):void;
    remove(key:string):void;
    has(key:string):boolean;

    query<T extends IViewObject>(key:string):T;
    find(key:string):Three.Object3D;
}

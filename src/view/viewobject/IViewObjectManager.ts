import IViewObject from "./IViewObject";

interface IViewObjectManager{

    add(key:string,vobj:IViewObject):void;
    remove(vobj:IViewObject):void;
    clear(key:string):void;
    count(key:string):number;
    findOne(key:string):IViewObject;
    find(key:string):IViewObject[];

}

export default IViewObjectManager;
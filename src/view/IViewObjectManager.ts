interface IViewObjectManager<TViewObject>{

    add(key:string,vobj:TViewObject):void;
    remove(vobj:THREE.Mesh):void;
    clear(key:string):void;
    count(key:string):number;
    findOne(key:string):TViewObject;
    find(key:string):TViewObject[];

}

export default IViewObjectManager;
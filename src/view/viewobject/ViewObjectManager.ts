import PlayGround from "../playground/PlayGround";
import IViewObject from "./IViewObject";
import IViewObjectManager from "./IViewObjectManager";
import * as Three from "three";

class ViewObjectManager implements IViewObjectManager{
    private vobjs:Map<string,IViewObject[]> = new Map();
    private keymap:Map<IViewObject,string> = new Map();
    
    private scene : Three.Scene;
    constructor(scene:Three.Scene){
        this.scene = scene;
    }
    add(key:string,vobj:IViewObject){
        if(this.count(key) == 0){
            this.vobjs.set(key,[vobj]);
        }else{
            let vobjs = this.find(key);
            vobjs.push(vobj);    
        }
        
        this.scene.add(vobj.getObject3D());
        this.keymap.set(vobj,key);
    }

    clear(key:string){
        if(this.count(key) == 0)
            return;
        
        for(let vobj of this.find(key))
            this.scene.remove(vobj.getObject3D());
    }
    remove(vobj:IViewObject){
        if(!this.keymap.has(vobj))
            throw new Error("this view object isn't managed")

        let key = this.keymap.get(vobj) as string;
        let index = this.getVObjIndex(key,vobj);
        if(index == -1)
            throw new Error("view object unknown error");

        this.find(key).splice(index,1);

        this.scene.remove(vobj.getObject3D());
        this.keymap.delete(vobj);
    }
    count(key:string):number{
        if(!this.vobjs.has(key))
            return 0;

        return this.vobjs.get(key)?.length as number;
    }
    private getVObjIndex(key:string,vobj:IViewObject):number{

        try{
            let vobjs = this.find(key);
            return vobjs.indexOf(vobj);
        }catch(err){
            return -1;
        }

    }
    findOne(key:string) : IViewObject{
        return this.find(key)[0];
    }
    find(key:string) : IViewObject[]{
        if(this.count(key) == 0)
            throw new Error("can't find view objects");
        return this.vobjs.get(key) as IViewObject[];
    }

}

export default ViewObjectManager;
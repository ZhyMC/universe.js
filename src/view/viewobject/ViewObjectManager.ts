import PlayGround from "../playground/PlayGround";
import IViewObject from "./IViewObject";
import IViewObjectManager from "./IViewObjectManager";
import * as Three from "three";

class ViewObjectManager implements IViewObjectManager{
    private vobjs:Map<string,IViewObject> = new Map();
    private keymap:Map<IViewObject,string> = new Map();
    
    private scene : Three.Scene;
    constructor(scene:Three.Scene){
        this.scene = scene;
    }
    ensure(key:string,exists:boolean,factory:()=>IViewObject) : any{
        if(!this.has(key) && exists)
            this.set(key,factory());
        else if(this.has(key) && !exists){
            this.remove(key);
        }

        return this.query(key);
    }
    set(key:string,vobj:IViewObject){
        if(this.has(key))
            this.remove(key);
        
        this.vobjs.set(key,vobj);

        this.scene.add(vobj.getObject3D());
        this.keymap.set(vobj,key);
    }
    remove(key:string):void{
        let vobj = this.query(key);
        this.vobjs.delete(key);
        this.scene.remove(vobj.getObject3D());
        this.keymap.delete(vobj);
    }
    has(key:string):boolean{
        return this.vobjs.has(key);
    }
    query(key:string) : IViewObject{
        if(!this.has(key))
            throw new Error("can't find view objects");
        return this.vobjs.get(key) as IViewObject;
    }
    find(key:string) : Three.Object3D{
        return this.query(key).getObject3D();
    }

}

export default ViewObjectManager;
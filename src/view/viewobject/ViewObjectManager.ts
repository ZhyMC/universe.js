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
    async ensure<T extends IViewObject>(key:string,exists:boolean,factory:()=>Promise<T> | T) : Promise<T>{
        let val = this.vobjs.get(key)

        if(exists && !val){
            let ins = await factory();
            this.set(key,ins); 
            return ins;   
        }else if(!exists && val){
            this.remove(key);
        }
        
            return val as T;
        
    }
    set(key:string,vobj:IViewObject){
        if(!this.has(key))
            this.scene.add(vobj.getObject3D());

        this.vobjs.set(key,vobj);
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
    query<T extends IViewObject>(key:string):T{
        if(!this.has(key))
            throw new Error("can't find view objects");
        return this.vobjs.get(key) as T;
    }
    find(key:string) : Three.Object3D{
        return this.query(key).getObject3D();
    }

}

export default ViewObjectManager;
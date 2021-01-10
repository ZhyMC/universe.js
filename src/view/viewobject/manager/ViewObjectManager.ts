import {IViewObject} from "../IViewObject";
import {IViewObjectManager} from "./IViewObjectManager";
import * as Mobx from "mobx";
import * as Three from "three";
import * as React from "react";

class ViewObjectManager implements IViewObjectManager{
    private vobjs:Map<string,IViewObject> = new Map();
    private keymap:Map<IViewObject,string> = new Map();
    private uistore : Mobx.ObservableSet<React.ReactNode>;
    private scene : Three.Scene;
    constructor(scene:Three.Scene,uistore:Mobx.ObservableSet<React.ReactNode>){
        this.scene = scene;
        this.uistore = uistore;
    }
    async ensure<T extends IViewObject>(key:string,exists:boolean,factory:()=>Promise<T> | T) : Promise<T>{
        let val = this.vobjs.get(key) as T;

        if(exists && !val){
            let ins = await factory();
            this.set(key,ins); 
            return ins;
        }else if(!exists && val){
            this.remove(key);
        }
        
        return val;
        
    }
    set(key:string,vobj:IViewObject){
        if(!this.has(key)){
            try{
                if(vobj.is3DObject)this.scene.add(vobj.o3)
                if(vobj.isUIObject)this.uistore.add(vobj.ui);    
            }catch(err){
                console.error(err);
            }
        }

        this.vobjs.set(key,vobj);
        this.keymap.set(vobj,key);


    }
    remove(key:string):void{
        let vobj = this.query(key);
        this.vobjs.delete(key);
        this.keymap.delete(vobj);

        this.scene.remove(vobj.o3);
        this.uistore.delete(vobj.ui);

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
        return this.query(key).o3;
    }

}

export {ViewObjectManager};
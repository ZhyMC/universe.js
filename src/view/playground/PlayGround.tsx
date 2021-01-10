import * as Three from "three";
import * as React from "react";
import * as Mobx from "mobx";
import * as MobxReact from "mobx-react";
Mobx.configure({enforceActions:'never'});

import {ViewObjectManager} from "../viewobject/manager/ViewObjectManager";
import {SimpleViewObject} from "../viewobject/3dobject/SimpleViewObject";
import {UIContainerComponent} from "./UIContainer";



class PlayGround{
    private obj_manager;
    private scene : Three.Scene;
    private camera? : Three.Camera;
    private dlight? : Three.DirectionalLight;
    private ui? : React.ReactNode;

    private uistore:Mobx.ObservableSet<React.ReactNode>
    = Mobx.observable.set([],{deep:false});

    constructor(){
        this.scene = new Three.Scene();
        this.scene.background = new Three.Color("black");
        
        this.obj_manager = new ViewObjectManager(this.scene,this.uistore);

        this.initUI();
        this.initSunlight();
        this.initCamera();

    }
    private initUI(){
        this.ui = (
                <UIContainerComponent components={this.uistore}>
                </UIContainerComponent>
         );
         
    }
    private initSunlight(){

        this.dlight = new Three.DirectionalLight(0xFFFFFF,0.5);
        this.obj_manager.set("sunlight",new SimpleViewObject(this.dlight));

    }
    private initCamera(){
        this.camera = new Three.PerspectiveCamera(50,2,0.1,2000);
     
        this.obj_manager.set("camera",new SimpleViewObject(this.camera));
        
    }
    getViewObjectManager(){
        return this.obj_manager;
    }
    getSunlight(){
        return this.dlight!.intensity;
    }
    setSunlight(sunlight:number){
        this.dlight!.intensity = sunlight;
    }
    setCameraPos(loc : Three.Vector3){
        this.dlight!.position = loc;
    }
    setCameraRot(rot : Three.Vector3){
        this.dlight!.rotation.set(rot.x,rot.y,rot.z);
    }
    getScene(){
        return this.scene;
    }
    getCamera(){
        return this.camera;
    }
    getUI(){
        return this.ui;
    }
}


export {PlayGround};
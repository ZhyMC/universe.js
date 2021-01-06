import * as Three from "three";
import {ViewObjectManager} from "../viewobject/manager/ViewObjectManager";
import {SimpleViewObject} from "../viewobject/SimpleViewObject";


class PlayGround{
    private obj_manager;
    private scene : Three.Scene;
    private camera? : Three.Camera;
    private dlight? : Three.DirectionalLight;
    constructor(){
        this.scene = new Three.Scene();
        this.scene.background = new Three.Color("black");

        this.obj_manager = new ViewObjectManager(this.scene);

        this.initSunlight();
        this.initCamera();
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
}


export {PlayGround};
import * as Three from "three";
import ViewObjectManager from "../viewobject/ViewObjectManager";
import SimpleViewObject from "../viewobject/SimpleViewObject";


class PlayGround{
    private obj_manager;
    private scene : Three.Scene;
    private camera : Three.Camera;
    private dlight:Three.DirectionalLight;
    constructor(){
        this.scene = new Three.Scene();
        this.obj_manager = new ViewObjectManager(this.scene);

        this.dlight = new Three.DirectionalLight();
        this.obj_manager.add("sunlight",new SimpleViewObject(this.dlight));

        this.camera = new Three.PerspectiveCamera();
        this.obj_manager.add("camera",new SimpleViewObject(this.camera));

    }
    getViewObjectManager(){
        return this.obj_manager;
    }
    getSunlight(){
        return this.dlight.intensity;
    }
    setSunlight(sunlight:number){
        this.dlight.intensity = sunlight;
    }
    setCameraPos(loc : Three.Vector3){
        this.dlight.position = loc;
    }
    setCameraRot(rot : Three.Vector3){
        this.dlight.rotation.set(rot.x,rot.y,rot.z);
    }
    getScene(){
        return this.scene;
    }
    getCamera(){
        return this.camera;
    }
}


export default PlayGround;
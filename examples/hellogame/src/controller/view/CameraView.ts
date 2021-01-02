import * as Universe from "universe.js";
import * as Three from "three";

class CameraView extends Universe.ViewController{

    async start(){
    
    }
    async doTick(){
        let changes = await this.db.getDeltaChanges(["Player"]);
        if(changes.length>0){
            let row = changes[0].row;
            let vobj = (await this.viewobj.query("camera")) as Universe.SimpleViewObject;

            let obj = vobj.getObject3D();
            obj.position.set(row.x,row.y+5,row.z+6);
            obj.lookAt(new Three.Vector3(row.x,row.y,row.z));
            
        }
          
    }
    
}

export default CameraView;

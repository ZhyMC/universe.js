import * as Universe from "universe.js";
import * as Three from "three";

class CameraView extends Universe.ViewController{

    async start(){
    
    }
    async doTick(){
        let changes = await this.db.getDeltaChanges(["Player"]);
        if(changes.length>0){
            let row = changes[0].row;
            
            let vobj = await this.viewobj.query("camera");
            
            vobj.o3.position.set(row.x,row.y+10,row.z+12);
            vobj.o3.lookAt(new Three.Vector3(row.x,row.y,row.z));
            
        }
          
    }
    
}

export {CameraView};

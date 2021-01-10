import * as Universe from "universe.js";
import * as Three from "three";

class CameraView extends Universe.ViewController{

    async start(){
    
    }
    async doTick(){
        let changes = await this.db.getSheetChanges("Player");
        if(changes.length>0){
            let row = changes[0].row;
            let camera = await this.viewobj.query("camera");
            camera.o3.position.set(row.x,row.y+10,row.z+12);
            camera.o3.lookAt(new Three.Vector3(row.x,row.y,row.z));
            
        }
          
    }
    
}

export {CameraView};

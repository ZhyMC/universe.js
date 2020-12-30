import * as Universe from "universe.js";



class ChunkView extends Universe.ViewController{

    start(){
    
    }
    private doBricksTick(){
        let watched = this.watcher.getWatched(["Brick"]);

        for(let {obj} of watched){
            let {x,z} = Universe.ChunkModel.getChunkXZ(obj.x,obj.z);
            let chunk = new Universe.ChunkModel(x,z,this.db);

            let vobj = this.viewobj.ensure(chunk.getKey(),chunk.has(),()=>{
                return new Universe.ChunkViewObject(this.mtl.getBasicMtl("brickmap"));
            }) as Universe.ChunkViewObject;

//            console.log(x*Universe.ChunkModel.xw,0,z*Universe.ChunkModel.zw);
            vobj.getObject3D().position.set(x*Universe.ChunkModel.xw,0,z*Universe.ChunkModel.zw);
            vobj.setBrickType(obj.x-x*Universe.ChunkModel.xw,obj.y,obj.z-z*Universe.ChunkModel.zw,Math.floor(Math.random()*16));

        }
    
    }
    doTick(){

        
       this.doBricksTick();


    }
    
}

export default ChunkView;

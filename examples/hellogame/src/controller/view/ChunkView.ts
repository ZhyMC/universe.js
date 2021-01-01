import * as Universe from "universe.js";
import {ChunkModel,ChunkViewObject} from "universe.js";


class ChunkView extends Universe.ViewController{

    async start(){
    
    }
    
    private async doChunkTick(){
        let changes = await this.db.getDeltaChanges(["Chunk"]);
        let changed = changes.map(({row})=>{
            return new ChunkModel(row.x,row.z,this.db);
        });
        
        for(let chunk of changed){
            this.viewobj.ensure(chunk.getKey(),await chunk.has(),()=>{
                return new ChunkViewObject(this.mtl.getBasicMtl("brickmap"));
            });
        }

    }
    private async doBricksTick(){
        let changes = await this.db.getDeltaChanges(["Brick"]);

        for(let {row} of changes){

//            console.log(row,x*Universe.ChunkModel.xw,0,z*Universe.ChunkModel.zw);

//            console.log(x*Universe.ChunkModel.xw,0,z*Universe.ChunkModel.zw);
            

            let {x,z} = ChunkModel.getChunkXZ(row.x,row.z);

            let vobj = this.viewobj.query(ChunkModel.getKey(x,z)) as ChunkViewObject;

            vobj.getObject3D().position.set(x*ChunkModel.xw,0,z*ChunkModel.zw);
            vobj.setBrickType(row.x-x*ChunkModel.xw,row.y,row.z-z*ChunkModel.zw,Math.floor(Math.random()*16));    
        

        }

    }
    async doTick(){
        
        await this.doChunkTick();
        await this.doBricksTick();
    }
    
}

export default ChunkView;

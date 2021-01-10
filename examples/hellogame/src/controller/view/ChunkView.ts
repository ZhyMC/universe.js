import * as Universe from "universe.js";
import {ChunkModel,ChunkViewObject} from "universe.js";


class ChunkView extends Universe.ViewController{

    async start(){
    
    }
    
    private async doChunkTick(){
        let changes = await this.db.getSheetChanges("Chunk");
        
        for(let change of changes){
            let {x,z} = change.row;
            await this.viewobj.ensure(ChunkModel.getKey(x,z),change.is,()=>
                new ChunkViewObject(x,z,this.mtl.getBasicMtl("brickmap"))
            );
        }

    }
    private async doBricksTick(){
        let changes = await this.db.getSheetChanges("Brick");

        let viewobjs = new Set<ChunkViewObject>();
        for(let {row} of changes){

            let {x,z} = ChunkModel.getChunkXZ(row.x,row.z);

            let vobj : ChunkViewObject = this.viewobj.query(ChunkModel.getKey(x,z));

            vobj.setBrickType(
                row.x - x*ChunkModel.xw,
                row.y,
                row.z - z*ChunkModel.zw,
                Math.floor(Math.random()*16)
            );    
            viewobjs.add(vobj);
        }
        viewobjs.forEach((obj)=>{
           
            obj.setUVUpdate();
        
        })

    }
    async doTick(){
        
       await this.doChunkTick();
       await this.doBricksTick();
    }
    
}

export {ChunkView};

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
            await this.viewobj.ensure(chunk.getKey(),await chunk.has(),async ()=>{
                let obj = new ChunkViewObject(this.mtl.getBasicMtl("brickmap"));
                await obj.load();
                return obj;
            });
        }

    }
    private async doBricksTick(){
        let changes = await this.db.getDeltaChanges(["Brick"]);

        let viewobjs = new Set<ChunkViewObject>();
        for(let {row} of changes){

//            console.log(row,x*Universe.ChunkModel.xw,0,z*Universe.ChunkModel.zw);

//            console.log(x*Universe.ChunkModel.xw,0,z*Universe.ChunkModel.zw);
            

            let {x,z} = ChunkModel.getChunkXZ(row.x,row.z);

            let vobj = this.viewobj.query(ChunkModel.getKey(x,z)) as ChunkViewObject;

            vobj.getObject3D().position.set(x*ChunkModel.xw,0,z*ChunkModel.zw);
            vobj.setBrickType(row.x-x*ChunkModel.xw,row.y,row.z-z*ChunkModel.zw,Math.floor(Math.random()*16));    
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

export default ChunkView;

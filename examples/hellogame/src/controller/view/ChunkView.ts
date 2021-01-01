import * as Universe from "universe.js";



class ChunkView extends Universe.ViewController{

    async start(){
    
    }
    private async doBricksTick(){
        let changes = this.db.getDeltaChanges(["Brick"]);

        for(let {row} of changes){
            let {x,z} = Universe.ChunkModel.getChunkXZ(row.x,row.z);
            let chunk = new Universe.ChunkModel(x,z,this.db);

            let vobj = this.viewobj.ensure(chunk.getKey(),await chunk.has(),()=>{
                return new Universe.ChunkViewObject(this.mtl.getBasicMtl("brickmap"));
            }) as Universe.ChunkViewObject;

//            console.log(row,x*Universe.ChunkModel.xw,0,z*Universe.ChunkModel.zw);

//            console.log(x*Universe.ChunkModel.xw,0,z*Universe.ChunkModel.zw);
            
            vobj.getObject3D().position.set(x*Universe.ChunkModel.xw,0,z*Universe.ChunkModel.zw);
            vobj.setBrickType(row.x-x*Universe.ChunkModel.xw,row.y,row.z-z*Universe.ChunkModel.zw,Math.floor(Math.random()*16));

        }
    
    }
    async doTick(){

        
       await this.doBricksTick();


    }
    
}

export default ChunkView;

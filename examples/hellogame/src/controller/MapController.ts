import * as Universe from "universe.js";

class MapController extends Universe.Controller{
    async start(){

    }
    async doTick(){
        let manager = new Universe.ChunkManagerModel(this.db);
        
        let player = await this.db.findOne("Player",{});

        let {x,z} = Universe.ChunkModel.getChunkXZ(player.x,player.z);

        
        for(let xs=-1;xs<=1;xs++)
         for(let zs=-1;zs<=1;zs++)    
            manager.loadChunk(x+xs,z+zs);
         
        

        
    }

}

export {MapController};
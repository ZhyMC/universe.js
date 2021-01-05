import * as Universe from "universe.js";

class MapController extends Universe.Controller{
    async start(){

    }
    async doTick(){
        let manager = new Universe.ChunkManagerModel(this.db);
        
        let player = await this.db.findOne("Player",{});

        let {x,z} = Universe.ChunkModel.getChunkXZ(player.x,player.z);
        await manager.loadChunk(x,z);

        
    }

}

export {MapController};
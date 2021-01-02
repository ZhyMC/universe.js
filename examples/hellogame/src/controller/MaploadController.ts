import * as Universe from "universe.js";
import PlayerModel from "../model/PlayerModel";



class MaploadController extends Universe.Controller{
    async start(){

    }
    async doTick(){
        let manager = new Universe.ChunkManagerModel(this.db);
        let player = new PlayerModel(this.db);
        let chunkxz = await player.getChunkXZ();
        
        await manager.loadChunk(chunkxz.x,chunkxz.z);

        
    }

}

export default MaploadController;
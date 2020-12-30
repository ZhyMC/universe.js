import * as Universe from "universe.js";
import PlayerModel from "../model/PlayerModel";



class MaploadController extends Universe.Controller{
    start(){

    }
    doTick(){
        let manager = new Universe.ChunkManagerModel(this.db);
        let player = new PlayerModel(this.db);
        let chunkxz = player.getChunkXZ();
        manager.loadChunk(chunkxz.x,chunkxz.z);

        
    }

}

export default MaploadController;
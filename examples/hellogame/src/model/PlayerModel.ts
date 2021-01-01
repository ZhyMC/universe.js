import * as Universe from "universe.js";
import * as Three from "three"
import DataModels from "../data/DataModels";

class PlayerModel extends Universe.SingleModel{
    constructor(db:Universe.IUniverseDB){
        super("player",DataModels.Player,db);
    }
    async getPosition(){
        let obj = await this.find();
        return new Three.Vector3(obj.x,obj.y,obj.z);
    }
    async getChunkXZ(){
        let pos = await this.getPosition();
        return Universe.ChunkModel.getChunkXZ(pos.x,pos.z);
    }
    
}

export default PlayerModel;
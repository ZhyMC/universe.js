import * as Universe from "universe.js";
import * as Three from "three"
import LokiDB from "lokijs";
import DataModels from "../data/DataModels";

class PlayerModel extends Universe.SingleModel{
    constructor(db:LokiDB){
        super("player",DataModels.Player,db);
    }
    getPosition(){
        let obj = this.find();
        return new Three.Vector3(obj.x,obj.y,obj.z);
    }

}

export default PlayerModel;
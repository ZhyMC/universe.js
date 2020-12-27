import * as Universe from "universe.js";
import * as Three from "three"
import LokiDB from "lokijs";
import DataModel_Player from "../data/PlayerModel";

class PlayerModel extends Universe.SingleModel{
    constructor(db:LokiDB){
        super("player",new DataModel_Player(),db);
    }
    getPosition(){
        let obj = this.find();
        return new Three.Vector3(obj.x,obj.y,obj.z);
    }

}

export default PlayerModel;
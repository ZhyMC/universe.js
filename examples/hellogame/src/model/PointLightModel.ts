import * as Universe from "universe.js";
import * as Three from "three"
import DataModels from "../data/DataModels";

class PointLightModel extends Universe.SingleModel{
    private key:string;
    constructor(key:string,db:Universe.IUniverseDB){
        super(key,DataModels.Player,db);
        this.key = key;
    }
    async getPosition(){
        let obj = await this.find();
        return new Three.Vector3(obj.x,obj.y,obj.z);
    }
    async setPosition(x:number,y:number,z:number){
        await this.set({x,y,z});
    }
    
}

export default PointLightModel;
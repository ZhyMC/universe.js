import DataModel from "../universe/data/DataModel";
import BindedModel from "../universe/model/BindedModel";
import LokiDB from "lokijs";

class ChunkModel extends BindedModel{
    private x:number;
    private y:number;
    constructor(x:number,y:number,db:LokiDB){
        super(ChunkModel.getDataModel(),db);
        this.x=x;
        this.y=y;
    }

    static getDataModel() : DataModel{
        return {
            name:"Chunk",
            prop:{
                x:{default:0},
                y:{default:0}
            }
        }
    }
}

export default ChunkModel;
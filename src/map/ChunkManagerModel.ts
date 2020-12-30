import BindedModel from "../universe/model/BindedModel";
import ChunkDataParser from "./ChunkDataParser";
import ChunkLoader from "./ChunkLoader";
import ChunkModel from "./ChunkModel";
import LokiDB from "lokijs";

class ChunkManagerModel extends BindedModel{
    
    constructor(db:LokiDB){
        super(ChunkModel.getDataModel(),db);
    }
    
    getChunk(x:number,z:number){
        return new ChunkModel(x,z,this.db);
    }
    isChunkLoaded(x:number,z:number){
        let model = this.getChunk(x,z);
        return model.has();
    }
    loadChunk(x:number,z:number){
        if(this.isChunkLoaded(x,z))
            return;
        
        let loader = new ChunkLoader(x,z);
        let parser = new ChunkDataParser(x,z,loader.getChunkData());

        let model = this.getChunk(x,z);
        model.add({x,z});
        
        parser.parse();
        parser.unpack(model);
    }
    unlockChunk(x:number,z:number){
        if(!this.isChunkLoaded(x,z))
            return;
        let model = this.getChunk(x,z);
        model.remove();
    }

}

export default ChunkManagerModel;
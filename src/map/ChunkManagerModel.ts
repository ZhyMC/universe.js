import BindedModel from "../universe/model/BindedModel";
import ChunkDataParser from "./ChunkDataParser";
import ChunkLoader from "./ChunkLoader";
import ChunkModel from "./ChunkModel";
import IUniverseDB from "../universe/data/db/IUniverseDB";

class ChunkManagerModel extends BindedModel{
    
    constructor(db:IUniverseDB){
        super(ChunkModel.getDataModel(),db);
    }
    
    getChunk(x:number,z:number){
        return new ChunkModel(x,z,this.db);
    }
    isChunkLoaded(x:number,z:number){
        let model = this.getChunk(x,z);
        return model.has();
    }
    async loadChunk(x:number,z:number){
        if(await this.isChunkLoaded(x,z))
            return;
        
        let loader = new ChunkLoader(x,z);
        let parser = new ChunkDataParser(x,z,loader.getChunkData());

        let model = this.getChunk(x,z);
        await model.add({x,z});
        
        parser.parse();
        await parser.unpack(model);
    }
    async unlockChunk(x:number,z:number){
        if(!(await this.isChunkLoaded(x,z)))
            return;
        let model = this.getChunk(x,z);
        await model.remove();
    }

}

export default ChunkManagerModel;
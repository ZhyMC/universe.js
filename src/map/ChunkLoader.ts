import {Buffer} from "buffer";

class ChunkLoader{
    private x:number;
    private z:number;
    constructor(x:number,z:number){
        this.x=x;
        this.z=z;
    }
    getChunkData(){
        return Buffer.allocUnsafe(100*1024);
    }

}

export default ChunkLoader;
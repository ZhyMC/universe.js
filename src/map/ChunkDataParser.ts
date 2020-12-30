import { Buffer } from "buffer";
import { BrickBinaryData } from "./BrickModel"
import ChunkModel from "./ChunkModel";

class ChunkDataParser{
    private buffer : Buffer;
    private offset : number = 0;
    private chunkdata : BrickBinaryData[] = [];
    private x:number;
    private z:number;
    constructor(x:number,z:number,buffer:Buffer){
        this.buffer = buffer;
        this.x=x;
        this.z=z;
    }
    private getXYZByIndex(index:number){
        let y = (index / 1) % ChunkModel.yw ;

        let z = Math.floor(index / ChunkModel.yw) % ChunkModel.zw;

        let x = Math.floor(index / ChunkModel.yw / ChunkModel.xw) % ChunkModel.xw;

        return {x:this.x * ChunkModel.xw + x,y:y,z:this.z*ChunkModel.zw+z};
    }
    parse(){
        for(let times = 0;this.offset<this.buffer.length; times++){
            let data : BrickBinaryData = {
                ...this.getXYZByIndex(times),
                chunkx:this.x,
                chunkz:this.z,

                type:this.readUint16()
            };
            this.chunkdata.push(data);

            if(times > 65536*1024)
                throw new Error("too long to parse Chunk")
        }

    }
    private readUint16() : number{
        let val = this.buffer.readUInt16BE(this.offset);
        this.offset+=2;
        return val;
    }
    getChunkData() : BrickBinaryData[]{
        return this.chunkdata;
    }
    unpack(chunk:ChunkModel){

        let bricks = chunk.getBricks();
        for(let i in bricks)
            bricks[i].ensure(this.chunkdata[i]);
        
        
    }

}

export default ChunkDataParser;
import BrickModel from "./BrickModel";
import { BrickBinaryData } from "./BrickModel"


class ChunkDataBuilder{
    private xw:number;
    private zw:number;
    private yw:number;
    private len:number;
    private data:Buffer;
    private offset:number = 0; 

    constructor(xw:number,zw:number,yw:number){
        this.xw=xw;
        this.zw=zw;
        this.yw=yw;
        this.len = xw*zw*yw*2;
        this.data = Buffer.allocUnsafe(this.len);
    }
    addBrick(brick:BrickModel){
        let data = brick.find();

        this.addBrickData(data);
    }
    addBrickData(data:BrickBinaryData){
        this.writeUint16(data.type);
    }
    private writeUint16(val:number){
        this.data.writeUInt16BE(val,this.offset);
        this.offset+=2;
    }
    getBuilt(){
        if(this.offset+1 != this.len)
            throw new Error("ChunkData hasn't been built");

        return this.data;
    }

}


export default ChunkDataBuilder;
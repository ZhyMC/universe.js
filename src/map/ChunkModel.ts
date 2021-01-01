import DataModel from "../universe/data/DataModel";
import BindedModel from "../universe/model/BindedModel";
import BrickModel from "../map/BrickModel";
import ChunkDataBuilder from "./ChunkDataBuilder";
import ChunkDataParser from "./ChunkDataParser";
import IUniverseDB from "../universe/data/db/IUniverseDB";

class ChunkModel extends BindedModel{
    static xw: number = 16;
    static zw: number = 16;
    static yw: number = 32;

    private x:number;
    private z:number;
    constructor(x:number,z:number,db:IUniverseDB){
        super(ChunkModel.getDataModel(),db);
        this.x=x;
        this.z=z;
    }
    getKey(){
        return ChunkModel.getKey(this.x,this.z);
    }
    static getKey(x:number,z:number){
        return `chunk.${x}.${z}`;
    }
    add(obj:object){
        return super.add.call(this,{key:this.getKey(),x:this.x,z:this.z});
    }
    has(){
        return super.has.call(this,this.getKey());  
    }
    remove(){
        super.remove.call(this,this.getKey());
        return this.db.findAndRemove(BrickModel.getDataModel().name,{chunkx:this.x,chunkz:this.z});
    }
    getBrickLocation(index_x:number,index_z:number,index_y:number){
        return {
            x:this.x*ChunkModel.xw+index_x,
            y:index_y,
            z:this.z*ChunkModel.yw+index_z,
        }
    }
    async getChunks(){
        let coll = ChunkModel.getDataModel().name;
        return (await this.db.find(coll,{})).map((chunkdata)=>{
            return new ChunkModel(chunkdata.x,chunkdata.z,this.db);
        })

    }
    getBricks() : BrickModel[]{
        let models:BrickModel[] = [];
        this.mapBricks((model)=>{
            models.push(model);
        });
        return models;
    }
    private mapBricks(handler:(brick:BrickModel,loc:{u:number,v:number,w:number})=>void){
        for(let u=0;u<ChunkModel.xw;u++)
            for(let v=0;v<ChunkModel.zw;v++){
                for(let w=0;w<ChunkModel.yw;w++){
                    let loc = this.getBrickLocation(u,v,w);
                    handler(new BrickModel(
                        loc.x,loc.y,loc.z,this.db
                    ),{u,v,w});
                }
            }
        
    }
    pack(){
        let builder = new ChunkDataBuilder(ChunkModel.xw,ChunkModel.zw,ChunkModel.yw);
        this.mapBricks((model)=>{
            builder.addBrick(model);
        })
        return builder.getBuilt();
    }
    unpack(rawdata : Buffer){
        let parser = new ChunkDataParser(this.x,this.z,rawdata);
        parser.parse();
        

        console.time("unpack");
        let brick = new BrickModel(this.x*ChunkModel.xw,0,this.z*ChunkModel.zw,this.db);
        brick.bulkAdd(parser.getChunkData());
        console.timeEnd("unpack");
        
    
    }

    static getDataModel() : DataModel{
        return {
            name:"Chunk",
            prop:{
                x:{default:0},
                z:{default:0}
            }
        }
    }
    static getChunkXZ(brick_x:number,brick_z:number){
        let x = Math.floor(brick_x/ChunkModel.xw);
        let z = Math.floor(brick_z/ChunkModel.zw);
        return {x,z};
    }
}

export default ChunkModel;
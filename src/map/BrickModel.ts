import LokiDB from "lokijs";
import DataModel from "../universe/data/DataModel";
import BindedModel from "../universe/model/BindedModel";
import IUniverseDB from "../universe/data/db/IUniverseDB";

class BrickModel extends BindedModel{
    static pack_length : number = 2;
    private x:number;
    private y:number;
    private z:number;
    constructor(x:number,y:number,z:number,db: IUniverseDB){
        super(BrickModel.getDataModel(),db);
        this.x=x;
        this.y=y;
        this.z=z;
    }
    
    getKey(){
        return `brick.${this.x}.${this.y}.${this.z}`;
    }
    static fromKey(key:string,db:IUniverseDB){
        let [p,x,y,z]=key.split(".").map((v)=>parseInt(v));
        return new BrickModel(x,y,z,db);
    }
    find(){
        return super.find.call(this,this.getKey());
    }
    has(){
        return super.has.call(this,this.getKey());
    }
    
    add(obj:any){
        return super.add.call(this,{key:this.getKey(),...obj});
    }
    set(data:any){
        return super.set.call(this,this.getKey(),data);
    }
    async ensure(data:any){

        if(await this.has())
            await this.set(data)
        else
            await this.add(data);
    }
    
    static getDataModel() : DataModel{

        return {
            name:"Brick",
            prop:{
                "type":{ default : 0 },
                "x" : { default : 0 },
                "y" : { default : 0 },
                "z" : { default : 0 },
                "chunkx": { default : 0 },
                "chunkz" : {default : 0 }
            }
        }
    }

}

type BrickBinaryData = {
    type:number,
    x:number,
    y:number,
    z:number,
    chunkx:number,
    chunkz:number
};

export { BrickBinaryData };
export default BrickModel;
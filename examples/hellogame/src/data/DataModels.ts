import * as Universe from "universe.js";


const components = {
    entity:{
        entity : { default : true },
        health : { default:10 },
        x : { default : 0 },
        y : { default : 0 },   
        z : { default : 0 }
        
    }
};

const datamodels : {[key:string] : Universe.DataModel} = {
    Player : {
        name:"Player",
        db:Universe.DBType.LokiDB,
        prop:{
            ...components.entity
        }
    },
    Chunk : Universe.ChunkModel.getDataModel(),
    Brick : Universe.BrickModel.getDataModel()

};
export default datamodels;
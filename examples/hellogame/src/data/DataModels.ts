import * as Universe from "universe.js";


const Components = {
    entity:{
        entity : { default : true },
        health : { default:10 },
        x : { default : 0 },
        y : { default : 0 },   
        z : { default : 0 }
        
    }
};

const DataModels : {[key:string] : Universe.DataModel} = {
    Player : {
        name:"Player",
        db:Universe.db.DBType.LokiDB,
        prop:{
            ...Components.entity
        }
    },
    Chunk : Universe.ChunkModel.getDataModel(),
    Brick : Universe.BrickModel.getDataModel()

};
export {Components,DataModels};
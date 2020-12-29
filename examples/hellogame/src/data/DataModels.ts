import * as Universe from "universe.js";

const datamodels : {[key:string] : Universe.DataModel} = {
    Player : {
        name:"Player",
        prop:{
            health : { default:10 },
            x : { default : 0 },
            y : { default : 0 },   
        }
    }
};
export default datamodels;
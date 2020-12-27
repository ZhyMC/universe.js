import * as Universe from "universe.js";

class PlayerModel extends Universe.DataModel{
    health : number = 10;
    x : number = 0;
    y : number = 0;
    z : number = 0;
}

export default PlayerModel;

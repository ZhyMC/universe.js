import * as Universe from "universe.js";

import PlayerView from "./controller/view/PlayerView";
import Startup from "./controller/Startup";

class Game extends Universe.Game{
    private cmd_ctx;
    constructor(canvas:HTMLCanvasElement){

        let playground = new Universe.PlayGround();
        super(canvas,playground);

        this.cmd_ctx  = new Universe.HTMLCommandContext(["A","W","S","D"]);
        this.addCommand(new Universe.HTMLCommand("A",this.cmd_ctx));
        this.addController(new Startup(this.commander,this.model_manager));
        this.addController(new PlayerView(this.viewobj_manager,this.model_manager,this.material_manager));
        
    }

}

//(window as any).Game = Game;
export default Game;
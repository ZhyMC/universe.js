import * as Universe from "universe.js";

import PlayerView from "./controller/view/PlayerView";
import StartupView from "./controller/view/StartupView";
import PlayerController from "./controller/PlayerController";

import DataModel_Player from "./data/PlayerModel";

class Game extends Universe.Game{
    private cmd_ctx;
    private assets_dir;
    constructor(canvas:HTMLCanvasElement,assets_dir:string){
        super(canvas);

        this.assets_dir = assets_dir;

        this.cmd_ctx  = new Universe.HTMLCommandContext(["a","w","s","d"]);

    }
    async init(){
        await this.loadAssets();

        this.setDataModels([
            new DataModel_Player()
        ]);

        this.addCommand(new Universe.HTMLCommand("a",this.cmd_ctx));
        this.addCommand(new Universe.HTMLCommand("d",this.cmd_ctx));
        this.addCommand(new Universe.HTMLCommand("w",this.cmd_ctx));
        this.addCommand(new Universe.HTMLCommand("s",this.cmd_ctx));
        
        this.addController(this.cmd_ctx);
        this.addController(new PlayerController(this.commander,this.db));
        this.addController(new StartupView(this.viewobj_manager,this.db,this.material_manager));
        this.addController(new PlayerView(this.viewobj_manager,this.db,this.material_manager));

        this.inited = true;
    }
    private loadAsset(path:string,key:string){
        return this.material_manager.loadSpriteMtl(key,`${this.assets_dir}/${path}.png`);
    }
    private async loadAssets(){
        await this.loadAsset("player","player");
    }
}

//(window as any).Game = Game;
export default Game;
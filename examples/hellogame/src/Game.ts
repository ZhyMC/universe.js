import * as Universe from "universe.js";

import PlayerView from "./controller/view/PlayerView";
import BrickView from "./controller/view/ChunkView";

import PlayerController from "./controller/PlayerController";
import MaploadController from "./controller/MaploadController";

import DataModels from "./data/DataModels";



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

        this.setDataModels(Object.values(DataModels));

        this.addCommand(new Universe.HTMLCommand("a",this.cmd_ctx));
        this.addCommand(new Universe.HTMLCommand("d",this.cmd_ctx));
        this.addCommand(new Universe.HTMLCommand("w",this.cmd_ctx));
        this.addCommand(new Universe.HTMLCommand("s",this.cmd_ctx));
        
        this.addController(this.cmd_ctx);
        this.addController(new PlayerController(this.commander,this.db));
        this.addController(new MaploadController(this.commander,this.db));
        this.addController(new PlayerView(this.viewobj_manager,this.material_manager,this.datawatcher));
        this.addController(new BrickView(this.viewobj_manager,this.material_manager,this.datawatcher));
        this.inited = true;
    }
    private loadSpriteAsset(path:string,key:string){
        return this.material_manager.loadSpriteMtl(key,`${this.assets_dir}/${path}.png`);
    }
    private loadBasicMtl(path:string,key:string){
        return this.material_manager.loadBasicMtl(key,`${this.assets_dir}/${path}.png`);
    }
    
    private async loadAssets(){
        await this.loadSpriteAsset("player","player");
        await this.loadBasicMtl("brickmap","brickmap");
        
    }
}

//(window as any).Game = Game;
export default Game;
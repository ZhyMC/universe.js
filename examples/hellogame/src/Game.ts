import * as Universe from "universe.js";

import PlayerView from "./controller/view/PlayerView";
import ChunkView from "./controller/view/ChunkView";

import PlayerController from "./controller/PlayerController";
import MaploadController from "./controller/MapController";
import CameraView from "./controller/view/CameraView";


import DataModels from "./data/DataModels";
import DBConfig from "./data/DBConfig";


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

        this.setDataModels(DBConfig,Object.values(DataModels));

        this.addCommand(new Universe.HTMLCommand("a",this.cmd_ctx));
        this.addCommand(new Universe.HTMLCommand("d",this.cmd_ctx));
        this.addCommand(new Universe.HTMLCommand("w",this.cmd_ctx));
        this.addCommand(new Universe.HTMLCommand("s",this.cmd_ctx));
        
        this.addController(this.cmd_ctx);
        this.addController(new PlayerController(this.commander,this.db));
        this.addController(new MaploadController(this.commander,this.db));
        this.addController(new CameraView(this.viewobj_manager,this.material_manager,this.db));
        this.addController(new PlayerView(this.viewobj_manager,this.material_manager,this.db));
        this.addController(new ChunkView(this.viewobj_manager,this.material_manager,this.db));
        
        this.inited = true;
    }
 
    
    private async loadAssets(){
        await this.material_manager.loadSpriteMtl("player",`${this.assets_dir}/player.png`);
        

        await this.material_manager.loadShaderMtl("brickmap",Universe.CartoonFragShaderA,{
            tex:{
                type:"t",
                value:await this.material_manager.loadTexture(`${this.assets_dir}/brickmap.png`)
            }
        });
 

        //await this.material_manager.loadBasicMtl("brickmap",`${this.assets_dir}/brickmap.png`);
    }
}

//(window as any).Game = Game;
export default Game;
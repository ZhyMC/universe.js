import * as Universe from "universe.js";
import {command} from "universe.js";


import {PlayerView,ChunkView,PlayerController,MapController,CameraView} from "./controller";


import {DataModels} from "./data/DataModels";
import {DBConfig} from "./data/DBConfig";


export class Game extends Universe.game.Game{
    private cmd_ctx;
    private assets_dir;
    constructor(assets_dir:string){
        super();

        this.assets_dir = assets_dir;

        this.cmd_ctx  = new command.HTMLCommandContext(["a","w","s","d"]);

    }
    async init(){
        await this.loadAssets();

        this.setDataModels(DBConfig,Object.values(DataModels));

        this.addCommand(new command.HTMLCommand("a",this.cmd_ctx));
        this.addCommand(new command.HTMLCommand("d",this.cmd_ctx));
        this.addCommand(new command.HTMLCommand("w",this.cmd_ctx));
        this.addCommand(new command.HTMLCommand("s",this.cmd_ctx));
        
        this.addController(this.cmd_ctx);
        this.addController(new PlayerController(this.commander,this.db));
        this.addController(new MapController(this.commander,this.db));
        this.addController(new CameraView(this.viewobj_manager,this.material_manager,this.db));
        this.addController(new PlayerView(this.viewobj_manager,this.material_manager,this.db));
        this.addController(new ChunkView(this.viewobj_manager,this.material_manager,this.db));
   
        this.inited = true;
    }
 
    private async loadTexture(path_key:string){
        return this.material_manager.loadTexture(`${this.assets_dir}/${path_key}.png`);
    }
    private async loadAssets(){
        await this.material_manager.loadSpriteMtl("player",await this.loadTexture("player"));        
        await this.material_manager.loadShaderMtl("brickmap",Universe.shader.GroundShader,{
            tex:{
                type:"t",
                value:await this.loadTexture("brickmap")
            }
        });
 

        //await this.material_manager.loadLambertMtl("brickmap",await this.loadTexture("brickmap"));
    }
}

export class Renderer extends Universe.renderer.CanvasRenderer{
    
}


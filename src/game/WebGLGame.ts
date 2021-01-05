import * as Three from "three";
import {IController} from "../universe/controller/IController";
import {Controllers} from "../universe/controller/Controllers";
import {CommandManager} from "../universe/command/CommandManager";
import {ICommand} from "../universe/command/ICommand";

import {PlayGround} from "../view/playground/PlayGround";
import {IViewObjectManager} from "../view/viewobject/manager/IViewObjectManager";
import {MaterialManager} from "../view/MaterialManager";
import {DataModel} from "../universe/data/DataModel";
import {DbBuilder} from "../universe/data/DbBuilder";
import {IUniverseDB} from "../universe/data/db/IUniverseDB";
import {NoDB} from "../universe/data/db/NoDB";
import {ComposeDB,  DBConfig } from "../universe/data/db/ComposeDB";

const sleep = (time:number)=>new Promise((resolve)=>setTimeout(resolve,time));

class WebGLGame{
    protected commander : CommandManager;
    protected viewobj_manager : IViewObjectManager;
    protected material_manager : MaterialManager;
    protected playground : PlayGround;
    protected db : IUniverseDB = new NoDB();

    protected inited : boolean = false;

    private controllers : Controllers;

    private renderer;

    private alive : boolean = false;
    private rendering : boolean =  false;
    private tick = 0;

    constructor(canvas:HTMLCanvasElement){

        this.commander = new CommandManager();
        this.playground = new PlayGround();
        this.material_manager = new MaterialManager();

        this.viewobj_manager = this.playground.getViewObjectManager();
       
        this.controllers = new Controllers();

        this.renderer = new Three.WebGLRenderer({
            canvas
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = Three.PCFSoftShadowMap
        
        
    }
    getPlayGround(){
        return this.playground;
    }
    setDataModels(dbconfig:DBConfig,datamodels:DataModel[]){
        this.db = new DbBuilder(new ComposeDB(dbconfig,datamodels),datamodels).getDatabase();
    }
    addCommand(cmd:ICommand){
        this.commander.addCommand(cmd);
    }
    addController(controller : IController){
        this.controllers.addController(controller);
    }
    setRendering(r:boolean){
        this.rendering = r;
    }
    async init(){
        this.inited = true;
    }
    async start(){
        if(this.alive)
            throw new Error("this game has already started");
        if(!this.inited)
            throw new Error("this game hasn't inited");
        
        this.alive = true;
        await this.db.open();
        await this.controllers.start();
        this.next_render_loop();

      
 
    }
    private async start_fixed_loop(thing:()=>Promise<void>,time:number){
        while(this.alive){

            await thing();
            await sleep(time);
        }
    }
    private async render(){
        
        await this.controllers.doTick(this.tick);
        await this.material_manager.doTick(this.tick);
        await this.db.clearChanges();
        this.renderer.render(this.playground.getScene(),this.playground.getCamera() as Three.Camera);

        if(this.rendering)
            this.renderer.render(this.playground.getScene(),this.playground.getCamera() as Three.Camera);

        if(this.alive)
            this.next_render_loop();

        this.tick++;
        
    }
    private next_render_loop(){
        requestAnimationFrame(this.render.bind(this));
    }

    close(){
        this.alive = false;
    }

}
   
export {WebGLGame};
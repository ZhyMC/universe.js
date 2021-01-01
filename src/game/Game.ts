import IController from "../universe/controller/IController";
import Controllers from "../universe/controller/Controllers";
import CommandManager from "../universe/command/CommandManager";
import ICommand from "../universe/command/ICommand";

import PlayGround from "../view/playground/PlayGround";
import * as Three from "three";
import IModel from "../universe/model/IModel";
import IViewObjectManager from "../view/viewobject/IViewObjectManager";
import ViewObjectManager from "../view/viewobject/ViewObjectManager";
import MaterialContainer from "../view/MaterialContainer";
import DataModel from "../universe/data/DataModel";
import DbBuilder from "../universe/data/DbBuilder";
import IUniverseDB from "../universe/data/db/IUniverseDB";
import NoDB from "../universe/data/db/NoDB";
import LokiDB from "../universe/data/db/LokiDB";
import WebIndexedDB from "../universe/data/db/WebIndexedDB";

const sleep = (time:number)=>new Promise((resolve)=>setTimeout(resolve,time));

class WebGLGame{
    protected commander : CommandManager;
    protected viewobj_manager : IViewObjectManager;
    protected material_manager : MaterialContainer;
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
        this.material_manager = new MaterialContainer();

        this.viewobj_manager = this.playground.getViewObjectManager();
       
        this.controllers = new Controllers();

        this.renderer = new Three.WebGLRenderer({
            canvas
        });
    }
    getPlayGround(){
        return this.playground;
    }
    setDataModels(newdb:IUniverseDB,datamodels:DataModel[]){
        this.db = new DbBuilder(newdb,datamodels).getDatabase();
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
        this.controllers.start();
        this.next_render_loop();
        this.fixed_loop();
    }
    private async fixed_loop(){
        while(this.alive){

            await this.fixedUpdate();
            await sleep(50);
        }
    }
    private async fixedUpdate(){
        await this.controllers.doTick(this.tick++);
        await this.db.clearChanges();
    }
    private render(){

        if(this.rendering)
            this.renderer.render(this.playground.getScene(),this.playground.getCamera());

        if(this.alive)
            this.next_render_loop();
    }
    private next_render_loop(){
        requestAnimationFrame(this.render.bind(this));
    }

    close(){
        this.alive = false;
    }

}
   
export default WebGLGame;
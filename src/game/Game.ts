import IController from "../universe/controller/IController";
import Controllers from "../universe/controller/Controllers";
import CommandManager from "../universe/command/CommandManager";
import ICommand from "../universe/command/ICommand";

import PlayGround from "../view/playground/PlayGround";
import * as Three from "three";
import LokiDB from "lokijs";
import IModel from "../universe/model/IModel";
import IViewObjectManager from "../view/viewobject/IViewObjectManager";
import ViewObjectManager from "../view/viewobject/ViewObjectManager";
import MaterialContainer from "../view/MaterialContainer";
import DataModel from "../universe/data/DataModel";
import DbBuilder from "../universe/data/DbBuilder";
import DataWatcher from "../universe/data/DataWatcher";

class WebGLGame{
    protected commander : CommandManager;
    protected viewobj_manager : IViewObjectManager;
    protected material_manager : MaterialContainer;
    protected playground : PlayGround;
    protected db : LokiDB = new LokiDB("");
    protected datawatcher : DataWatcher = new DataWatcher(this.db);

    protected inited : boolean = false;

    private controllers : Controllers;
    private renderer;

    private alive : boolean = false;
    private rendering : boolean =  false;
    private fixed_loop_handler? : number;
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
    setDataModels(datamodels:DataModel[]){
        this.db = new DbBuilder(datamodels).getDatabase();
        this.datawatcher = new DataWatcher(this.db);

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
    start(){
        if(this.alive)
            throw new Error("this game has already started");
        if(!this.inited)
            throw new Error("this game hasn't inited");
        
        this.alive = true;
        this.controllers.start();
        this.next_render_loop();
        this.fixed_loop_handler = setInterval(this.fixedUpdate.bind(this),50) as any;
    }
    private fixedUpdate(){
        this.controllers.doTick(this.tick++);
        this.datawatcher.flushWatched();
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
        clearInterval(this.fixed_loop_handler);
        this.alive = false;
    }

}
   
export default WebGLGame;
import IController from "../universe/controller/IController";
import Controllers from "../universe/controller/Controllers";
import CommandManager from "../universe/command/CommandManager";
import ICommand from "../universe/command/ICommand";

import PlayGround from "../view/playground/PlayGround";
import * as Three from "three";
import ModelManager from "../universe/model/ModelManager";
import LokiDB from "lokijs";
import IModel from "../universe/model/IModel";
import IViewObjectManager from "../view/viewobject/IViewObjectManager";
import ViewObjectManager from "../view/viewobject/ViewObjectManager";
import MaterialContainer from "../view/MaterialContainer";

class WebGLGame{
    protected commander : CommandManager;
    protected model_manager : ModelManager;
    protected viewobj_manager : IViewObjectManager;
    protected material_manager : MaterialContainer;

    private controllers : Controllers;
    private playground : PlayGround;
    private renderer;
    private alive : boolean = false;
    private rendering : boolean =  false;
    private fixed_loop_handler? : number;
    private tick = 0;

    constructor(canvas:HTMLCanvasElement,playground:PlayGround){

        this.commander = new CommandManager();
        this.playground = playground;
        this.material_manager = new MaterialContainer();
        this.model_manager = new ModelManager(new LokiDB("game"));
        this.viewobj_manager = this.playground.getViewObjectManager();
       
        this.controllers = new Controllers();

        this.renderer = new Three.WebGLRenderer({
            canvas
        });
        this.start();
    }
    addModel(model:IModel){
        this.model_manager.addModel(model);
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
    private start(){
        this.alive = true;
        this.controllers.start();
        this.next_render_loop();
        this.fixed_loop_handler = setInterval(this.fixedUpdate.bind(this),50) as any;
    }
    private fixedUpdate(){
        this.controllers.doTick(this.tick++);
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
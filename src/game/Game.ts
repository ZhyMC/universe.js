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

class Game{
    protected commander : CommandManager;
    protected viewobj_manager : IViewObjectManager;
    protected material_manager : MaterialManager;
    protected playground : PlayGround;
    protected db : IUniverseDB = new NoDB();

    protected inited : boolean = false;

    private controllers : Controllers;

    private alive : boolean = false;
    private tick = 0;

    constructor(){

        this.commander = new CommandManager();
        this.playground = new PlayGround();
        this.material_manager = new MaterialManager();

        this.viewobj_manager = this.playground.getViewObjectManager();
       
        this.controllers = new Controllers();
        
    }
    getUI(){
        return this.playground.getUI();
    }
    getScene(){
        return this.playground.getScene();
    }
    getCamera(){
        return this.playground.getCamera();
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
        this.next_tick();
    }
    private async doTick(){
        
        await this.controllers.doTick(this.tick);
        await this.material_manager.doTick(this.tick);
        await this.db.clearChanges();

    
        if(this.alive)
            this.next_tick();

        this.tick++;
        
    }
    private next_tick(){
        requestAnimationFrame(this.doTick.bind(this));
    }
    close(){
        this.alive = false;
    }

}
   
export {Game};
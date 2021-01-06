import * as Three from "three";
import { ICommand } from "../universe/command";
import { IController } from "../universe/controller";
import { DataModel } from "../universe/data";
import { DBConfig } from "../universe/data/db";

export interface IGame{
    start():Promise<void>;
    close():void;
    getCamera():Three.Camera;
    getScene():Three.Scene;
    getUI():React.ReactNode,
    setDataModels(dbconfig:DBConfig,datamodels:DataModel[]):void;
    addCommand(cmd:ICommand):void;
    addController(controller : IController):void;
    init():Promise<void>;
    start():Promise<void>;
}
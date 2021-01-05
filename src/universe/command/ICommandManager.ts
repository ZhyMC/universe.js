import {ICommand} from "./ICommand";

interface ICommandManager{
    addCommand(cmd:ICommand):void;
    isActive(cmd:string):boolean;
}
export {ICommandManager};

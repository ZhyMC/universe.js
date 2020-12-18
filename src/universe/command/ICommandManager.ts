import ICommand from "./ICommand";

interface ICommanderManager{
    addCommand(cmd:ICommand):void;
    isActive(cmd:string):boolean;
}
export default ICommanderManager;

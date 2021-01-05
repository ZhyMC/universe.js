import {ICommand} from "./ICommand";
import {ICommandManager} from "./ICommandManager";

class CommandManager implements ICommandManager{
    private cmds : Map<string,ICommand> = new Map();
    constructor(){

    }
    addCommand(cmd:ICommand){
        this.cmds.set(cmd.getCommand(),cmd);
    }
    isActive(cmd:string){
        if(!this.cmds.has(cmd))
            throw new Error("this command can not find");

        return (this.cmds.get(cmd) as ICommand).isActive();
    }
}

export {CommandManager};

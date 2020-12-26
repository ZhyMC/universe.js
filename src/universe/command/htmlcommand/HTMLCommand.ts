import ICommand from "../ICommand";
import HTMLCommandContext from "./HTMLCommandContext";


class HTMLCommand implements ICommand{
    private ctx : HTMLCommandContext;
    private key : string;
    constructor(key:string,ctx : HTMLCommandContext){
        this.ctx = ctx;
        this.key = key;
    }
    getCommand(): string {
        return this.key;
    }
    isActive(): boolean {
        return this.ctx.getKeyState(this.key);
    }
    
}

export default HTMLCommand;
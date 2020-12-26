import MouseTrap from "mousetrap";
import ICommand from "../ICommand";

class HTMLCommandContext{
    private map : Map<string,boolean> = new Map();
    private listen : string[];
    constructor(listen:string[])
    {
        this.listen = listen;

        for(let key of listen){
            this.map.set(key,false);
            MouseTrap.bind(key,()=>{
                this.keydown(key);
            },"keydown");
            MouseTrap.bind(key,()=>{
                this.keyup(key);
            },"keyup");
            
        }
    }
    private keydown(key:string){
        this.map.set(key,true);
    }
    private keyup(key:string){
        this.map.set(key,false);
    }
    getKeyState(key:string) : boolean{
        if(!this.map.has(key))
            throw new Error("this key doesn't binded");

        return this.map.get(key) as boolean;
    }
    close(){
        for(let key of this.listen){
            MouseTrap.unbind(key,"keydown");
            MouseTrap.unbind(key,"keyup");
        }
    }

}

export default HTMLCommandContext;

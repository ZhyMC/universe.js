import MouseTrap from "mousetrap";
import IController from "../../controller/IController";
import ICommand from "../ICommand";

class HTMLCommandContext implements IController{
    private keymap : Map<string,boolean> = new Map();
    private fixed_map : Map<string,boolean> = new Map();
    private listen : string[];
    constructor(listen:string[])
    {
        this.listen = listen;

        for(let key of listen){
            this.keymap.set(key,false);
            this.fixed_map.set(key,false);
            MouseTrap.bind(key,()=>{
                this.keydown(key);
            });
            MouseTrap.bind(key,()=>{
                this.keyup(key);
            },"keyup");
            
        }
    }
    private keydown(key:string){
        this.keymap.set(key,true);
    }
    private keyup(key:string){
        this.keymap.set(key,false);
    }
    getName(){
        return "HTMLCommandContext";
    }
    start(){

    }
    doTick(){
        this.keymap.forEach((v,k)=>{
            let is = this.isKey(k);
            this.fixed_map.set(k,is);
        })
    }
    
    private isKey(key:string) : boolean{
        if(!this.keymap.has(key))
            throw new Error("this key doesn't binded");

        return this.keymap.get(key) as boolean;
    }
    public getKeyState(key:string) : boolean{
        if(!this.fixed_map.has(key))
            throw new Error("this key doesn't binded");

        return this.fixed_map.get(key) as boolean;

    }
    close(){
        for(let key of this.listen){
            MouseTrap.unbind(key,"keydown");
            MouseTrap.unbind(key,"keyup");
        }
    }

}

export default HTMLCommandContext;

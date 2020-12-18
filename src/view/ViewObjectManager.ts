import IViewObjectManager from "./IViewObjectManager";

class ViewObjectManager implements IViewObjectManager<THREE.Mesh>{
    private vobjs:Map<string,THREE.Mesh[]> = new Map();
    private keymap:Map<THREE.Mesh,string> = new Map();
    
    private scene : THREE.Scene;
    constructor(scene:THREE.Scene){
        this.scene = scene;
    }
    add(key:string,vobj:THREE.Mesh){
        if(this.count(key) == 0)
            this.vobjs.set(key,[]);
        
        let vobjs = this.find(key);
        vobjs.push(vobj);
        this.scene.add(vobj);
        this.keymap.set(vobj,key);
    }

    clear(key:string){
        if(this.count(key) == 0)
            return;
        
        for(let vobj of this.find(key))
            this.scene.remove(vobj);
    }
    remove(vobj:THREE.Mesh){
        if(!this.keymap.has(vobj))
            throw new Error("this view object isn't managed")

        let key = this.keymap.get(vobj) as string;
        let index = this.getVObjIndex(key,vobj);
        if(index == -1)
            throw new Error("view object unknown error");

        this.find(key).splice(index,1);

        this.scene.remove(vobj);
        this.keymap.delete(vobj);
    }
    count(key:string):number{
        if(!this.vobjs.has(key))
            return 0;

        return this.vobjs.get(key)?.length as number;
    }
    private getVObjIndex(key:string,vobj:THREE.Mesh):number{

        try{
            let vobjs = this.find(key);
            return vobjs.indexOf(vobj);
        }catch(err){
            return -1;
        }

    }
    findOne(key:string) : THREE.Mesh{
        return this.find(key)[0];
    }
    find(key:string) : THREE.Mesh[]{
        if(this.count(key) == 0)
            throw new Error("can't find view objects");
        return this.vobjs.get(key) as THREE.Mesh[];
    }

}

export default ViewObjectManager;
import * as Three from "three";
import HTMLImageLoader from "../utils/HTMLImageLoader";

class MaterialContainer{
    private map : Map<string,Three.Material> = new Map();
    constructor(){

    }
    async loadSpriteMtl(key:string,url:string){
        let loader = new Three.TextureLoader();
        let texture = await new Promise<Three.Texture>((r)=>loader.load(url,r));

        let mtl = new Three.SpriteMaterial({
            map:texture
        });
        this.set(key,mtl);
    }
    set(key : string,mtl : Three.Material){
        this.map.set(key,mtl);
    }
    get(key : string){
        if(!this.map.has(key))
            throw new Error(`this material ${key} doesn't exists`)
        return this.map.get(key) as Three.Material;
    }
    getSpriteMtl(key:string){
        return this.get(key) as Three.SpriteMaterial;
    }
}

export default MaterialContainer;
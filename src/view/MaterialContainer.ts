import * as Three from "three";
import HTMLImageLoader from "../utils/HTMLImageLoader";

class MaterialContainer{
    private map : Map<string,Three.Material> = new Map();
    constructor(){

    }
    async loadSpriteMtl(key:string,url:string){
        let loader = new HTMLImageLoader(url);
        let img = await loader.getImage();
        let mtl = new Three.SpriteMaterial({
            map:new Three.Texture(img)
        });
        this.set(key,mtl);
    }
    set(key : string,mtl : Three.Material){
        this.map.set(key,mtl);
    }
    get(key : string){
        return this.map.get(key) as Three.Material;
    }
}

export default MaterialContainer;
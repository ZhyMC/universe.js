import * as Three from "three";
import HTMLImageLoader from "../utils/HTMLImageLoader";

class MaterialContainer{
    private map : Map<string,Three.Material> = new Map();
    constructor(){

    }
    private async loadTexture(url:string){
        let loader = new Three.TextureLoader();
        
        let texture = (await loader.loadAsync(url)) as Three.Texture; 
        texture.minFilter = Three.LinearFilter;
        texture.magFilter = Three.NearestFilter;

        return texture;
    }
    async loadSpriteMtl(key:string,url:string){

        let mtl = new Three.SpriteMaterial({
            map:await this.loadTexture(url)
        });
        this.set(key,mtl);
    }
    async loadBasicMtl(key:string,url:string){
        
        let mtl = new Three.MeshBasicMaterial({
            map:await this.loadTexture(url)
        })
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
    getBasicMtl(key:string){
        return this.get(key) as Three.MeshBasicMaterial;
    }
    getSpriteMtl(key:string){
        return this.get(key) as Three.SpriteMaterial;
    }
}

export default MaterialContainer;
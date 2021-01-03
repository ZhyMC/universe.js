import * as Three from "three";
import HTMLImageLoader from "../utils/HTMLImageLoader";
import VertexShader from "../shaders/VertexShader";

class MaterialContainer{
    private map : Map<string,Three.Material> = new Map();
    constructor(){

    }
    async loadTexture(url:string){
        let loader = new Three.TextureLoader();
        
        let texture = (await loader.loadAsync(url)) as Three.Texture; 
        texture.minFilter = Three.NearestFilter;
        texture.magFilter = Three.NearestFilter;

        return texture;
    }
    async loadShaderMtl(key:string,fragshader:string,initUniforms:any){
        
        let mtl = new Three.ShaderMaterial({
            vertexShader:VertexShader, 
            fragmentShader:fragshader,
            uniforms : {
                ...Three.UniformsLib.lights,
                ...initUniforms
            },
            lights:true,
        });


        this.set(key,mtl);
        return mtl;
    }

    async loadSpriteMtl(key:string,url:string){

        let mtl = new Three.MeshBasicMaterial({
            map:await this.loadTexture(url)
        });
        this.set(key,mtl);
        return mtl;
    }
    async loadBasicMtl(key:string,url:string){
        
        let mtl = new Three.MeshLambertMaterial({
            map:await this.loadTexture(url)
        })
        this.set(key,mtl);
        return mtl;
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
        return this.get(key) as Three.MeshStandardMaterial;
    }
    getSpriteMtl(key:string){
        return this.get(key) as Three.SpriteMaterial;
    }
}

export default MaterialContainer;
import * as Three from "three";

class MaterialManager{
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
    async loadShaderMtl(key:string,shader_source:{frag:string,vert:string},initUniforms:any){
        
        let mtl = new Three.ShaderMaterial({
            vertexShader:shader_source.vert, 
            fragmentShader:shader_source.frag,
            uniforms : {
                ...Three.UniformsLib.lights,
                ...initUniforms
            },
            lights:true,
        });
        
        this.set(key,mtl);
        return mtl;
    }
    async loadSpriteMtl(key:string,texture:Three.Texture){
        let mtl = new Three.MeshBasicMaterial({
            side:Three.DoubleSide,
            map:texture,
            transparent:true
        })
        this.set(key,mtl);
        return mtl;
    }
    addMaterial<T extends Three.Material>(key:string,mtl:T):T{
        this.set(key,mtl);
        return mtl;
    }
    
    doTick(tick:number){
        for(let v of this.map.values()){
            if(v instanceof Three.ShaderMaterial)
                v.uniforms["uTime"] = {value:tick};
        }
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

export {MaterialManager};
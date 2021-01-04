import * as Three from "three";
import ChunkModel from "../../map/ChunkModel";
import IViewObject from "./define/IViewObject";

class ChunkViewObject implements IViewObject{
    static faces = [
      { // left
        dir: [ -1,  0,  0, ],
        corners: [
          { pos: [ 0, 1, 0 ], uv: [ 0, 1 ], },
          { pos: [ 0, 0, 0 ], uv: [ 0, 0 ], },
          { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
          { pos: [ 0, 0, 1 ], uv: [ 1, 0 ], },
        ],
      },
      { // right
        dir: [  1,  0,  0, ],
        corners: [
          { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
          { pos: [ 1, 0, 1 ], uv: [ 0, 0 ], },
          { pos: [ 1, 1, 0 ], uv: [ 1, 1 ], },
          { pos: [ 1, 0, 0 ], uv: [ 1, 0 ], },
        ],
      },
      { // bottom
        dir: [  0, -1,  0, ],
        corners: [
          { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
          { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
          { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
          { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
        ],
      },
      { // top
        dir: [  0,  1,  0, ],
        corners: [
          { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
          { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
          { pos: [ 0, 1, 0 ], uv: [ 1, 0 ], },
          { pos: [ 1, 1, 0 ], uv: [ 0, 0 ], },
        ],
      },
      { // back
        dir: [  0,  0, -1, ],
        corners: [
          { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
          { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
          { pos: [ 1, 1, 0 ], uv: [ 0, 1 ], },
          { pos: [ 0, 1, 0 ], uv: [ 1, 1 ], },
        ],
      },
      { // front
        dir: [  0,  0,  1, ],
        corners: [
          { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
          { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
          { pos: [ 0, 1, 1 ], uv: [ 0, 1 ], },
          { pos: [ 1, 1, 1 ], uv: [ 1, 1 ], },
        ],
      },
    ];
    static initedGeometry = ChunkViewObject.getInitedGeometry();
    private geometry;
    private tileWidth = 16;
    private tileTextureWidth = 256;
    private tileTextureHeight = 64;

    private mesh : Three.Mesh;

    constructor(bricks_material:Three.Material){
      
        this.geometry = ChunkViewObject.initedGeometry.clone();

        this.mesh = new Three.Mesh(this.geometry,bricks_material);
        this.mesh.receiveShadow = true;

    }
  
    static getOffset(dx:number,dy:number,dz:number,xw:number,yw:number,zw:number){
      return  dx * zw * yw + 
              dz * yw + 
              dy;
    }
    static getInitedGeometry(){
      let {positions,normals,indexes} = ChunkViewObject.getInitedAttrs(ChunkModel.xw,ChunkModel.yw,ChunkModel.zw);

      let len = ChunkModel.xw*ChunkModel.yw*ChunkModel.zw;
      let points = 4;
      let faces = 6;

      let geometry = new Three.BufferGeometry();
      geometry.setAttribute("position",new Three.BufferAttribute(positions,3));
      geometry.setAttribute("normal",new Three.BufferAttribute(normals,3));

      geometry.setAttribute("uv",new Three.BufferAttribute(new Float32Array(len*2*points*faces),2));

      geometry.setIndex(indexes);
      
      return geometry;

    }
    static getInitedAttrs(xw:number,yw:number,zw:number){
      let len = xw*yw*zw;
      let positions = new Float32Array(len*3*4*6);
      let normals = new Float32Array(len*3*4*6);
      let indexes = new Array(len*6*6);
    
        const indices = [
            0,1,2,
            2,1,3
        ];
        let faces = ChunkViewObject.faces;
        for(let dx=0;dx<xw;dx++)
            for(let dy=0;dy<yw;dy++)
                for(let dz=0;dz<zw;dz++){
                    let offset = ChunkViewObject.getOffset(dx,dy,dz,xw,yw,zw);
                    let off_indices = indices;
            
                    let ndx_face = 0;
                    for(let {dir,corners} of faces){
            
                        let ndx_corner = 0;
                            
                        for(let {pos,uv} of corners){
            
                            let base = (offset*faces.length + ndx_face) *corners.length  + ndx_corner;
                            normals.set(dir,base*3);
                            positions.set([dx+pos[0],dy+pos[1],dz+pos[2]],base*3);
            
                            ndx_corner = ndx_corner + 1;
                        };
            
                        let base = (offset*faces.length+ndx_face);
                        for(let i in off_indices){
                            let ind = parseInt(i);
                            indexes[base*6+ind] = base*4+off_indices[ind];
                        }
                        ndx_face++;
                    }
            }

        return {positions,normals,indexes};
    }
    async load(){

    }
    private getOffset(dx:number,dy:number,dz:number){
        return  dx * ChunkModel.zw * ChunkModel.yw + 
                dz * ChunkModel.yw + 
                dy;

    }

    setBrickType(dx:number,dy:number,dz:number,type:number){
        let offset = this.getOffset(dx,dy,dz);

        let ndx_face = 0;
        let faces = ChunkViewObject.faces;
        for(let {dir,corners} of faces){
           if(ndx_face!=3){
             ndx_face++;
             continue;
            }
                
            let ndx_corner = 0;
            
            for(let {pos,uv} of corners){
                
                let base = (offset*faces.length + ndx_face) *corners.length  + ndx_corner;

                (this.geometry.attributes.uv.array as Float32Array).set([
                    (type + uv[0]) * this.tileWidth / this.tileTextureWidth,
                    1 + (uv[1] - 1 ) * this.tileWidth / this.tileTextureHeight,
                ],base*2);
              
                ndx_corner = ndx_corner + 1;
            }

            ndx_face++;
        }

    }
    setPosUpdate(){
        this.geometry.attributes.position.needsUpdate = true;
    }
    setUVUpdate(){
        this.geometry.attributes.uv.needsUpdate = true;
    }
    setUpdate(){
        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.attributes.normal.needsUpdate = true;
        this.geometry.attributes.uv.needsUpdate = true;
    }
    get o3() : Three.Object3D{
        return this.mesh;
    }    

}

export default ChunkViewObject;
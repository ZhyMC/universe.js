import * as Three from "three";
import IViewObject from "./IViewObject";
import ChunkModel from "../../map/ChunkModel";
import Model from "../../universe/model/Model";

class ChunkViewObject implements IViewObject{
    static points = 4;
    static indices = [
        0,1,2,
        2,1,3
    ];
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
    private uvs;
    private positions;
    private normals;
    private indexes;

    private geometry;
    private tileWidth = 16;
    private tileTextureWidth = 256;
    private tileTextureHeight = 64;

    private xw = ChunkModel.xw;
    private yw = ChunkModel.yw;
    private zw = ChunkModel.zw;
    
    private mesh : Three.Mesh;

    constructor(bricks_material:Three.Material){
        let len = this.xw*this.yw*this.zw;
        let points = ChunkViewObject.points;
        let faces = ChunkViewObject.faces.length;


        this.uvs = new Float32Array(len*2*points*faces);
        this.positions = new Float32Array(len*3*points*faces);
        this.normals = new Float32Array(len*3*points*faces);
        this.indexes = new Array<number>(len*6*faces)

        this.geometry = new Three.BufferGeometry();

        this.geometry.setAttribute("position",new Three.BufferAttribute(this.positions,3));
        this.geometry.setAttribute("normal",new Three.BufferAttribute(this.normals,3));
        this.geometry.setAttribute("uv",new Three.BufferAttribute(this.uvs,2));

        this.initAttrs();

        this.mesh = new Three.Mesh(this.geometry,bricks_material);

    }
    private initAttrs(){
        this.setIndexes();
    }
    private getOffset(dx:number,dy:number,dz:number){
        return  dx * this.zw * this.yw + 
                dz * this.yw + 
                dy;

    }
    setIndexes(){
      for(let offset=0;offset<this.xw*this.yw*this.zw;offset++){
        let off_indices = ChunkViewObject.indices;

        let ndx_face = 0;
        let faces = ChunkViewObject.faces;
        for(let face of faces){
            let base = (offset*faces.length+ndx_face);
            for(let i in off_indices){
              let ind = parseInt(i);
              this.indexes[base*6+ind] = base*4+off_indices[ind];
            }
            ndx_face++;
        }
      }
      this.geometry.setIndex(this.indexes);
      this.setUpdate();
  
    }
    setBrickType(dx:number,dy:number,dz:number,type:number){
        let offset = this.getOffset(dx,dy,dz);
        
      
        let ndx_face = 0;
        let faces = ChunkViewObject.faces;
        for(let {dir,corners} of faces){
          
            let ndx_corner = 0;
            
            for(let {pos,uv} of corners){

                let base = (offset*faces.length + ndx_face) *corners.length  + ndx_corner;
                this.normals.set(dir,base*3);
                this.positions.set([dx+pos[0],dy+pos[1],dz+pos[2]],base*3);
                
                this.uvs.set([
                    (type + uv[0]) * this.tileWidth / this.tileTextureWidth,
                    1 + (uv[1] - 1 ) * this.tileWidth / this.tileTextureHeight,
                ],base*2);
//                console.log(1 + (uv[1] - 1 ) * this.tileWidth / this.tileTextureWidth)

                if(type == 0){
                  this.positions.set([dx,dx,dx],base*3);
                  this.setPosUpdate();
                }
              
                ndx_corner = ndx_corner + 1;
            }


         

            ndx_face++;
        }


        this.setUVUpdate();
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

    getObject3D() : Three.Object3D{
        return this.mesh;
    }    

}

export default ChunkViewObject;
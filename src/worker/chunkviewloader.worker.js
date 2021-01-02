const funcs = {

    getOffset(dx,dy,dz,xw,yw,zw){
        return  dx * zw * yw + 
                dz * yw + 
                dy;
    },
    getInitedAttrs(xw,yw,zw){
        let len = xw*yw*zw;
        let positions = new Float32Array(len*3*4*6);
        let normals = new Float32Array(len*3*4*6);
        let indexes = new Array(len*6*6);
    
        const indices = [
            0,1,2,
            2,1,3
        ];
        const faces = [
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
        for(let dx=0;dx<xw;dx++)
            for(let dy=0;dy<yw;dy++)
                for(let dz=0;dz<zw;dz++){
                    let offset = this.getOffset(dx,dy,dz,xw,yw,zw);
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

};

(()=>{

    self.onmessage = async ({data})=>{
        
        try{
            let msg = {
                ok : true,
                callid:data.callid,
                data : await funcs[data.method](...data.params)
            }
            self.postMessage(msg);
        }catch(err){
            self.postMessage({ok:false,callid:data.callid,data:err.stack});
        }
        
    }
    
})();
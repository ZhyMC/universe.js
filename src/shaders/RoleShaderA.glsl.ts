const vert =  
    `
    #include <common>
    #include <fog_pars_vertex>
    #include <shadowmap_pars_vertex>
    void main() {
      #include <begin_vertex>
      #include <project_vertex>
      #include <worldpos_vertex>
      #include <shadowmap_vertex>
      #include <fog_vertex>
    }
    `;
const frag = 
    `
    void main() {

     

    }
    `;
    
export const RoleShaderA = {vert,frag};

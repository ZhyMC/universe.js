const vert =  
    `
    varying vec3 vNormal;
    varying vec3 vPos;
    varying vec2 vUv;

    void main() {
  

      vPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
      vUv = uv;
      vNormal = normalize( normalMatrix *normal );

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      
    }
    `;
const frag = 
    `
    varying vec3 vNormal;
    varying vec3 vPos;
    varying vec2 vUv;

    uniform sampler2D tex;

    uniform float uTime;
    struct PointLight {
        vec3 position;
        vec3 color;
    };

    uniform PointLight pointLights[ NUM_POINT_LIGHTS ];


    void main() {

      
      vec3 color;
      for(int i=0;i<NUM_POINT_LIGHTS;i++){
    
          float ratio =  (1.0 + sin(0.02*uTime))/2.0 *0.1+1.0;

          vec3 pos = vPos;
          
          pos.x = float(int(pos.x*ratio))/ratio;
          pos.y = float(int(pos.y*ratio))/ratio;
          pos.z = float(int(pos.z*ratio))/ratio;


          float lightness = max(1.0 - distance(pointLights[i].position , pos) / 15.0,0.0);

          
          vec3 lightdir = normalize(pointLights[i].position - pos);
          float diffuse = dot(vNormal, lightdir);
          
          diffuse = float(int(diffuse * 10.0)) / 10.0;
          
          vec3 uvcolor = texture2D(tex,vUv).xyz;
          
          float val = 1.2*min(ratio*diffuse*lightness+0.3,1.0);

          gl_FragColor = vec4(val*uvcolor,1.0);
      }
    

    }
    `;
    
export const GroundShader = {vert,frag};

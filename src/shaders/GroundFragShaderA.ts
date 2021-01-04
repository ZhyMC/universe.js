export default 
`
struct PointLight {
   vec3 position;
   vec3 color; 

};
varying vec3 vNormal;
varying vec3 vPos;
varying vec2 vUv;

uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
uniform sampler2D tex;

uniform float uTime;


void main() {

  
  vec3 color;
  for(int i=0;i<NUM_POINT_LIGHTS;i++){
 
      float ratio =  (1.0 + sin(0.02*uTime))/2.0 *0.1+1.0;

      vec3 pos = vPos;
      
      pos.x = float(int(pos.x*ratio))/ratio;
      pos.y = float(int(pos.y*ratio))/ratio;
      pos.z = float(int(pos.z*ratio))/ratio;


      float lightness = max(1.0 - distance(pointLights[i].position , pos) / 8.0,0.0);

      
      vec3 lightdir = normalize(pointLights[i].position - pos);
      float diffuse = dot(vNormal, lightdir);
      
      diffuse = float(int(diffuse * 10.0)) / 10.0;
      
      vec3 uvcolor = texture2D(tex,vUv).xyz;
      
      float val = ratio*diffuse*lightness + 0.3;

      gl_FragColor = vec4(val*uvcolor,1.0);
  }
 

}
`;

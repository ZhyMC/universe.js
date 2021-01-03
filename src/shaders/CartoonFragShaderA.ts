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

void main() {

  
  vec3 color;
  for(int i=0;i<NUM_POINT_LIGHTS;i++){
 

      float lightness = max(1.0 - distance(pointLights[i].position , vPos) / 10.0,0.0);
     
      vec3 lightdir = normalize(pointLights[i].position - vPos);
      float diffuse = dot(vNormal, lightdir);
      
      diffuse = float(int(diffuse * 10.0)) / 10.0;
      
      vec3 uvcolor = texture2D(tex,vUv).xyz;
      

      gl_FragColor = vec4(diffuse*uvcolor*lightness,1.0);
  }
 

}
`;

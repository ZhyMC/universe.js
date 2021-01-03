export default 
`
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPos;
    void main() {
        vUv = uv;
        vPos = (modelViewMatrix * vec4(position , 1.0)).xyz;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position , 1.0); 
    }
`;

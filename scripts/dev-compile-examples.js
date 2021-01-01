const {execSync} = require("child_process");
const path = require("path");


async function build(){
    let basepath = path.join(__dirname,"../examples/");

    execSync("npm run build");
    
    execSync("node " + path.join(basepath,"./hellogame/","devcompile.js"));
    
}


build();
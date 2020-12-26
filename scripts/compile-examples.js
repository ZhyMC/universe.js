const {execSync} = require("child_process");
const path = require("path");

let basepath = path.join(__dirname,"../examples/");

execSync("npm run build");

execSync("node " + path.join(basepath,"./hellogame/","compile.js"));

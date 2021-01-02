const fs = require("fs-extra");
const text2jsvar = require("text2jsvar");
const path = require("path");

let basedir = path.join(__dirname,"../src/worker");
let distdir = path.join(basedir,"dist");
let files = fs.readdirSync(basedir);
fs.removeSync(distdir);
fs.ensureDirSync(distdir)

files.forEach((f)=>{
    let name = path.join(basedir,f);
    if(fs.statSync(name).isDirectory())
        return;

    let str = text2jsvar.convert(fs.readFileSync(name).toString());

    let compiled = `
    export default \` 
        ${str}
    \`
    `;
    fs.writeFileSync(path.join(distdir,path.basename(f,".js")+".ts"),compiled);

})
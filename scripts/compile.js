const {execSync} = require("child_process");
const fs = require("fs-extra");
const path = require("path");

async function build(){
    try{
        await fs.copy(path.join(__dirname,"../src/worker"),path.join(__dirname,"../worker"),{overwrite:true})
    }catch(err){
        console.log(err);
    }
    execSync("tsc");
}

build();


const browserify = require('browserify');
const tsify = require('tsify');
const fs = require("fs-extra");
const path = require("path");


async function build(){

    try{
        await fs.copy(path.join(__dirname,"../../worker"),path.join(__dirname,"./worker"),{
            overwrite: true,
        });
    }catch(err){

    }

    browserify(path.join(__dirname,"./src/Game.ts"),{standalone:"Game"})
        .plugin(tsify)
        .bundle()
        .on('error', function (error) { console.error(error.toString()); })
        .pipe(fs.createWriteStream(path.join(__dirname,"./game.js")));

}

build();
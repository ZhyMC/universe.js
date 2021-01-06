const browserify = require('browserify');
const tsify = require('tsify');
const fs = require("fs-extra");
const path = require("path");
const bablify = require("babelify");
const realpathify = require("realpathify");

async function build(){

    browserify(path.join(__dirname,"./src/Game.ts"),{standalone:"Game"})

        .plugin(tsify)
        /*.transform(bablify, {
            global : true,
            presets: [["@babel/preset-env",{
                targets:"last 1 Chrome versions"
            }]],
            plugins:["@babel/plugin-transform-modules-commonjs"]
        })*/
        
        .bundle()
        .on('error', function (error) { console.error(error.toString()); })
        .pipe(fs.createWriteStream(path.join(__dirname,"./game.js")));

}

build();
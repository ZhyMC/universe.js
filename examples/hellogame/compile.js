var browserify = require('browserify');
var tsify = require('tsify');
var fs = require("fs");
var path = require("path");

browserify(path.join(__dirname,"./src/Game.ts"),{standalone:"Game"})
    .plugin(tsify)
    .bundle()
    .on('error', function (error) { console.error(error.toString()); })
    .pipe(fs.createWriteStream(path.join(__dirname,"./game.js")));

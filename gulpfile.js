//Calling installed packages and making variables. 
const {src, dest, watch, series, parallel} = require('gulp');
const concat = require('gulp-concat');
const uglify = require('de').default;
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
// const cssmin = require('gulp-cssmin');
const sass = require('gulp-sass')(require('sass'));
const sassnode = require("node-sass");
//const imagewebp = require('gulp-webp');


//Paths to files
const files={
    htmlPath: "src/**/*.html",
    jsPath: "src/**/*.js",
    imgPath: "src/img/*",
    sassPath: "src/sass/*.scss"
}

//Function to convert sass into CSS, compress the file,  make a map and then add it into pub folder. 
function sassTask() {
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
        .pipe(sourcemaps.write('../maps'))
        .pipe(dest("pub/css"))
        .pipe(browserSync.stream());
}

//HTML-task copies HTML files and sends it to pub-folder
function copyHTML(){
    return src(files.htmlPath)
    .pipe(dest('pub'));
}

//Js-task, concatinating and minifying js-files to one main js in pub folder, making a source map file
function jsTask(){
   return src(files.jsPath)
   .pipe(sourcemaps.init())
   .pipe(concat('main.js'))
   .pipe(uglify())
   .pipe(sourcemaps.write('../maps'))
   .pipe(dest('pub/js'));
}

//image task that puts images into an img folder in "pub"-folder
function imgTask(){
    return src(files.imgPath)
    .pipe(dest('pub/img'));
}
// //Webp
// //function webpImage(){
//     //return src('pub/img/*.{jpg, png, jpeg}')
//     //.pipe(imagewebp)
//     .pipe(dest('pub/img'))
// }

//Watch task that watches if any changes has been done in any file then it calls the functions and run the gulp file again and send the new updates into pub folder. 
function watchTask(){
    browserSync.init({
        server: "./pub"
    });

    watch(
        [files.htmlPath, files.sassPath, files.jsPath, files.imgPath],
        parallel(copyHTML, sassTask, jsTask, imgTask)
      ).on("change", browserSync.reload);
}


    exports.default = series(
        parallel(copyHTML, jsTask, sassTask, imgTask),
        watchTask
      );
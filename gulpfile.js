var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive');


//Config

var sassConfig = {
    compileSassTaskName: 'compile-sass',
    watchFiles: './src/scss/*.scss',
    entryPoint: './src/scss/style.scss',
    dest: './dist/'
};

var jsConfig = {
    concatJsTaskName: 'concat-js',
    watchFiles: './src/js/*.js',
    entryPoint: './src/js/main.js',
    concatFile: 'main.js',
    dest: './dist/'
};

var uglifyConfig = {
    uglifyTaskName: 'uglify',
    src: './dist/main.js',
    dest: './dist/'
}

var imagesConfig = {
    imagesTaskName: "optimize-images",
    src: 'src/img/*',
    dest: "./dist/img/",
    responsive: {
        'user-*.jpg': [{
            width: 50,
            rename: {suffix: '-50px'}
        }, {
            width: 180,
            rename: {suffix: '-180px'}
        }],
        'art-*.jpg': [{//1200,900, 700, 350,
            width: 1200,
            rename: {suffix: '-1200px'}
        }, {
            width: 900,
            rename: {suffix: '-900px'}
        }, {
            width: 700,
            rename: {suffix: '-700px'}
        }, {
            width: 350,
            rename: {suffix: '-350px'}
        }, {
            width: 175,
            rename: {suffix: '-175px'}
        }]
    }
};

//Compilamos SASS
gulp.task(sassConfig.compileSassTaskName, function(){
	gulp.src(sassConfig.entryPoint)
    .pipe(sourcemaps.init())
	.pipe(sass().on('error', function(error){
		return notify().write(error);
	}))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(sassConfig.dest))
	.pipe(browserSync.stream())
	.pipe(notify("Sass Compilado"));
});

//concatenamos js

gulp.task(jsConfig.concatJsTaskName, function(){
    gulp.src(jsConfig.entryPoint)
    .pipe(tap(function(file){
        file.contents = browserify(file.path, {debug:true}).bundle().on('error', function(error){
            return notify().write(error);
        });
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsConfig.dest))
    .pipe(notify("JS concatenado"))
    .pipe(browserSync.stream());
})

//tarea por defecto

gulp.task("default", [sassConfig.compileSassTaskName, jsConfig.concatJsTaskName, imagesConfig.imagesTaskName], function(){
	browserSync.init({
		proxy: "127.0.0.1:8000"
	});
	//Vigila todos los archivos scss y cuando haya cambios lanza compile-sass
	gulp.watch(sassConfig.watchFiles, [sassConfig.compileSassTaskName]);
	//Cualquier cambio en el html recarga el navegador
	gulp.watch('./*.html', function(){
		browserSync.reload();
	});

    gulp.watch(jsConfig.watchFiles, [jsConfig.concatJsTaskName]);

});


//minifica js
gulp.task(uglifyConfig.uglifyTaskName, function(){
    gulp.src(uglifyConfig.src)
    .pipe(uglify())
    .pipe(gulp.dest(uglifyConfig.dest))
    .pipe(notify("JS Minificado"));
})

gulp.task(imagesConfig.imagesTaskName, function(){
    gulp.src(imagesConfig.src)
    .pipe(responsive(imagesConfig.responsive))
    .pipe(imagemin())
    .pipe(gulp.dest(imagesConfig.dest));
});




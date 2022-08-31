'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass')(require('sass'));
var del = require('del'); 
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cleanCss = require('gulp-clean-css');
var flatmap = require('gulp-flatmap');
var htmlmin = require('gulp-htmlmin');


//sass
gulp.task('sass', function () {
    return gulp.src('./css/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
  });
  
  gulp.task('sass:watch', function () {
    gulp.watch('./css/*.scss', gulp.series('sass'));
  });

//browser-sync
gulp.task('browser-sync',function() {
    var files = [
        './*.html', './css/*.css', './js/*.js', '/img/*.{png,jpg,gig}'
    ];
    browserSync.init(files,{               //the first param is files
        server: {                           //the second is options for server
            baseDir: './'
        }
    });
});


gulp.task('default', gulp.series(gulp.parallel('browser-sync', 'sass:watch'), 
     function(done){
    done();
}));

//clean
gulp.task('clean', function(){
    return del(['dist']);
});

//copyfonts
gulp.task('copyfonts', function(done){
    gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
    done();
});

//Images
gulp.task('imagemin', function(){
    return gulp.src('img/*.{png,jpg,gif}')
      .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function(){
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file){
        return stream
        .pipe(usemin({
            css: [ rev() ], 
            html: [function(){
                return htmlmin({collapseWhitespace: true})
            }],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss:[ cleanCss(), 'concat']
        }))
        .pipe(gulp.dest('dist/'));
    }));
});

gulp.task('build', gulp.series('clean', gulp.parallel('copyfonts','imagemin', 'usemin'),
    function(done){
        done();
    }));

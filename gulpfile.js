'use strict';

var config = require('./config/config');
var gulp = require('gulp');
var gulpwatch = require('gulp-watch');
var gulpsass = require('gulp-sass');
var gulpminifycss = require('gulp-minify-css');
var gulpsequence = require('gulp-sequence');
var gulpprefixer = require('gulp-autoprefixer');
var gulpjade = require('gulp-jade');
var gulpclean = require('gulp-clean');
var gulpuglify = require('gulp-uglify');
var cssspriter = require('gulp-css-spriter');
var imagemin = require('gulp-imagemin');
var gulpchanged = require('gulp-changed');
var gulpplumber = require('gulp-plumber');

// default task
gulp.task('default', ['clean'], gulpsequence(['sass', 'jadecompile', 'js', 'copyiconfont', 'copycss', 'copyjson'], 'autoprefix', 'copyimage', 'csssprite', 'css'));

// watch
gulp.task('watch', ['default'], function() {
  gulp.watch(config.jade.watch, ['jadecompile']);
  gulp.watch(config.sass.src,  function (e) {
      gulpsequence('sass', 'autoprefix', 'copyimage', 'csssprite', 'css')(function (err) {

      })
  });
  gulp.watch(config.js.src, ['js']);
  gulp.watch(config.image.src, ['copyimage']);
});

// sass task
gulp.task('sass', function () {
    return gulp.src(config.sass.src)
                .pipe(gulpplumber())
                .pipe(gulpsass(config.sass.settings))
                .pipe(gulp.dest(config.sass.build));
});

// css task
gulp.task('css', function () {
    return gulp.src(config.css.src)
                .pipe(gulpminifycss(config.css.settings))
                .pipe(gulp.dest(config.css.build));
});

// css autoprefix
gulp.task('autoprefix', function () {
    return gulp.src(config.autoprefix.src)
                .pipe(gulpprefixer(config.autoprefix.settings))
                .pipe(gulp.dest(config.autoprefix.build));
});

// jade compile
gulp.task('jadecompile', function () {
   return gulp.src(config.jade.src)
                .pipe(gulpjade(config.jade.settings))
                .pipe(gulp.dest(config.jade.build));
});

// clean project
gulp.task('clean', function () {
   return gulp.src(config.clean.src)
                .pipe(gulpclean());
});

// js compile
gulp.task('js', function () {
   return gulp.src(config.js.src)
                // .pipe(gulpuglify(config.js.settings))
                .pipe(gulp.dest(config.js.build));
});

// css sprite
gulp.task('csssprite', function () {
    return gulp.src(config.csssprite.src)
                .pipe(cssspriter(config.csssprite.settings))
                .pipe(gulp.dest(config.csssprite.build));
});

// copy file
gulp.task('copyimage', function () {
   return gulp.src(config.image.src)
                .pipe(gulpchanged(config.image.src))
                // .pipe(imagemin())
                .pipe(gulp.dest(config.image.build));
});

// copy iconfont
gulp.task('copyiconfont', function () {
   return gulp.src(config.iconfont.src)
                .pipe(gulp.dest(config.iconfont.build));
});

// copy css
gulp.task('copycss', function () {
    return gulp.src(config.libcss.src)
                .pipe(gulp.dest(config.libcss.build));
});

// copy json
gulp.task('copyjson', function () {
  return gulp.src(config.json.src)
    .pipe(gulp.dest(config.json.build));
});
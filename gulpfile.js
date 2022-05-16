'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const del = require('del');
const jsmin = require("gulp-jsmin");
const pug = require('gulp-pug');

gulp.task('pug', function () {
  return gulp.src('source/pug/*.pug')
    .pipe(pug({pretty: '\t'}))
    .pipe(gulp.dest('source/'))
});

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(sourcemap.write('.'))
      .pipe(gulp.dest('build/css'))
      .pipe(server.stream());
});

gulp.task('css-min', function () {
  return gulp.src('source/sass/style.scss')
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(csso())
      .pipe(rename('style.min.css'))
      .pipe(sourcemap.write('.'))
      .pipe(gulp.dest('build/css'))
      .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/pug/**/*.pug', gulp.series('pug', 'html', 'refresh'));
  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css', 'css-min'));
  gulp.watch('source/img/*-icon.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/js/main.js', gulp.series('jsmin', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
      ]))

      .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
      .pipe(webp({quality: 90}))
      .pipe(gulp.dest('source/img'));
});

gulp.task('jsmin', function (cb) {
  gulp.src('source/js/main.js')
      .pipe(jsmin())
      .pipe(rename('main.min.js'))
      .pipe(gulp.dest('build/js'));
  cb();
});

gulp.task('sprite', function () {
  return gulp.src('source/img/icons/*.svg')
      .pipe(svgstore({inlineSvg: true}))
      .pipe(rename('sprite_auto.svg'))
      .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
      .pipe(posthtml([
        include()
      ]))
      .pipe(gulp.dest('build'));
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**',
    'source/img/**',
    'source/css/**',
    'source/js/**',
    'source//*.ico'
  ], {
    base: 'source'
  })
      .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', gulp.series('clean', 'copy', 'css', 'css-min', 'images', 'webp', 'sprite', 'pug', 'jsmin', 'html'));
gulp.task('start', gulp.series('build', 'server'));

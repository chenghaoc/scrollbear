var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var rollup = require('gulp-rollup')
var babel = require('gulp-babel')
var rename = require('gulp-rename')
var util = require('gulp-util')
var jscs = require('gulp-jscs')
var watch = require('gulp-watch')
var plumber = require('gulp-plumber')
var print = require('gulp-print')
var uglify = require('gulp-uglify');
var nodeResolve = require('rollup-plugin-node-resolve')
var commonjs    = require('rollup-plugin-commonjs')

gulp.task('compile', () => {
  watch('./src/*.js', compile)
  return compile()
})

function compile() {
  return gulp.src('./src/index.js')
        .pipe(print(function(filepath) {
          return 'built: ' + filepath
        }))
        .pipe(plumber({
          errorHandler: function(err) {
            console.log(err.message)
            this.emit('end')
          }
        }))
        .pipe(rollup({
          sourceMap: true
        }))
        .pipe(babel())
        .on('error', util.log)
        .pipe(rename('scrollbear.js'))
        .pipe(gulp.dest('./build'))
        .pipe(uglify())
        .pipe(rename('scrollbear.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build'))
}

gulp.task('default', ['compile'])
gulp.task('lint', function() {
  return gulp.src('src/**')
        .pipe(jscs({fix: true, configPath: '.jscsrc'}))
        .pipe(gulp.dest('src/'))
})

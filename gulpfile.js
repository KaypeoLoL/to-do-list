var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();


var sassFile = './*.sass';
var cssFile = './css';

gulp.task('css', function() {
    return gulp.src(sassFile)
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
          browsers: ['last 10 versions'],
          cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cssFile))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['css'], function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./*.sass', ['css']);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./*.js').on('change', browserSync.reload);
});

gulp.task('default', ['serve', 'css']);

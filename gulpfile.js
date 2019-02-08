const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');

//Watch task
gulp.task('default', function () {
  watch('./sass/**/*.scss', function () {
    gulp
      .src('./sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./public/css'));
  });
});

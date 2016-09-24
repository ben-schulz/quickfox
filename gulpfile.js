const gulp = require('gulp');
const gutil = require('gulp-util');
const mocha = require('gulp-mocha');

gulp.task('default', ['watch', 'test']);

gulp.task('jshint', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch('source/javascript/**/*.js', ['jshint']);
});

gulp.task('test', function() {
  gulp.src('./test/**/*.js', {read: false})
      .pipe(mocha({reporter: 'nyan'}))
});


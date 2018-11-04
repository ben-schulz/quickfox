const gulp = require('gulp');
const mocha = require('gulp-mocha');

const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');

const concat = require('gulp-concat');

const foxModules = [];

gulp.task('default', ['watch', 'test']);

gulp.task('jshint', function() {
  return gulp.src('src/javascript/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter(stylish));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['test', 'jshint']);
});

gulp.task('test', function() {
    return gulp.src('./test/**/*.js', {read: false})
	.pipe( mocha( { reporter: 'nyan' } ) )
});


gulp.task('concat', function() {

    return gulp.src(foxModules)
	.pipe(concat('out.js'))
        .pipe(gulp.dest('.'));
});

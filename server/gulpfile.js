var gulp = require('gulp');

var clean = require('gulp-clean');
gulp.task('clean', function() {
	return gulp.src('rel')
		.pipe(clean());
});

var ts = require('gulp-typescript');
var project = ts.createProject('tsconfig.json');
gulp.task('compile', function() {
    return project.src()
		.pipe(project())
		.js.pipe(gulp.dest('rel'));
});

var copy = require('gulp-copy');
gulp.task('copy', function() {
	gulp.src('./site/**/*')
		.pipe(gulp.dest('rel'));
});

var sequence = require('run-sequence');
gulp.task('build', function(done) {
	sequence('clean', 'compile', 'copy', done);
});

var concat = require('gulp-concat');
gulp.task('concat', function() {
	return gulp.src('./rel/**/*.js')
		.pipe(concat('rip.js'))
		.pipe(gulp.dest('./t'));
});
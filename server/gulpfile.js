const tempFolder = 'temp';
const distFolder = 'dist';

var gulp = require('gulp');
var gulpClean = require('gulp-clean');
var gulpTypeScript = require('gulp-typescript');
var gulpTypeScriptProject = gulpTypeScript.createProject('tsconfig.json');
var gulpSequence = require('run-sequence');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify-es').default;

function clean(dest) {
	return gulp.src(dest)
		.pipe(gulpClean());
}

function compile(dest) {
	return gulpTypeScriptProject.src()
		.pipe(gulpTypeScriptProject())
		.js.pipe(gulp.dest(dest));
}

function copy(sourcePattern, dest) {
	gulp.src(sourcePattern)
		.pipe(gulp.dest(dest));
}

function concat(sourcePattern, destFolder, destFile) {
	return gulp.src(sourcePattern)
		.pipe(gulpConcat(destFile))
		.pipe(gulp.dest(destFolder));
}

gulp.task('clean-dist', function() {
	clean(distFolder);
});

gulp.task('clean-temp', function() {
	clean(tempFolder);
});

gulp.task('compile', function() {
    return compile(tempFolder);
});

gulp.task('copy', function() {
	copy('./site/**/*')
		.pipe(gulp.dest(distFolder));
});

gulp.task('build', function(done) {
	gulpSequence('clean-temp', 'compile', 'concat', 'uglify', done);
});

gulp.task('concat', function() {
	concat('./temp/**/*.js', 'temp', 'rip.js');
});

gulp.task('uglify', function() {
	return gulp.src('./temp/**/*.js')
		.pipe(gulpUglify())
		.pipe(gulp.dest('temp'));
});
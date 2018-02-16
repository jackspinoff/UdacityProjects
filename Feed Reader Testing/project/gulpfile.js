var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');



//-- GULP TASK --//
gulp.task('scripts', function(){
	gulp.src('src/js/*.js')
		.pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
		.pipe(gulp.dest('dist/js/'));

	gulp.src('src/jasmine/spec/*.js')
		.pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
		.pipe(gulp.dest('dist/jasmine/spec/'));

	gulp.task('default', function() {
	    return gulp.src('src/css/*.css')
	        .pipe(cssnano())
	        .pipe(rename({
	            suffix: '.min'
	        }))
	        .pipe(gulp.dest('dist/css/'));
	    });
});



gulp.task('default', ['scripts']);
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var cssmin = require('gulp-cssmin');



//-- GULP TASK --//
gulp.task('scripts', function(){
	gulp.src('js/*.js')
		.pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
		.pipe(gulp.dest('dist/js/'));

	gulp.src('views/js/*.js')
		.pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
		.pipe(gulp.dest('dist/views/js/'));

	gulp.task('default', function() {
	    return gulp.src('views/css/*.css')
	        .pipe(cssnano())
	        .pipe(rename({
	            suffix: '.min'
	        }))
	        .pipe(gulp.dest('dist/views/css/'));
	    });

	gulp.task('default', function () {
	gulp.src('css/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css'));
	});
});



gulp.task('default', ['scripts']);
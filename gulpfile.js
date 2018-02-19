const gulp = require('gulp'),
      concat = require('gulp-concat'),
      pump = require('pump'),
      minify = require('gulp-minify-css'),
      sass = require('gulp-sass'),
      del = require('del'),
      autoprefixer = require('gulp-autoprefixer'),
      merge = require('merge-stream');


const paths = {
    styles: {
        src_css: './src/stylesheets/src/*.css',
        src_scss: './src/stylesheets/src/*.scss',
        dest: './src/stylesheets/dist/'
    },
};

gulp.task('style', function(cb) {
    let scssStream = gulp.src([paths.styles.src_scss])
        .pipe(sass())
        .pipe(concat('scss-files.scss'));

    let cssStream = gulp.src([paths.styles.src_css])
        .pipe(concat('css-files.css'));

    pump([
        merge(scssStream, cssStream),
        concat('style.min.css'),
        minify(),
        autoprefixer({ browsers: ['last 2 versions'], cascade: false}),
        gulp.dest(paths.styles.dest)
    ], cb);
});

gulp.task('clean', function() {
    del([ paths.styles ]);
});

gulp.task('watch', function() {
    gulp.watch(paths.styles.src_scss, gulp.start('style'));
});

gulp.task('build', ['clean', 'style']);

gulp.task('default', ['style']);

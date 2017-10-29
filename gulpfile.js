let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    gulpsync = require('gulp-sync')(gulp),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload,
    runSequence = require('run-sequence');

let config = {
    'src': './src',
    'dest': './',
    'html': {
        'src': './src/*.html',
        'dest': './'
    },
    'sass': {
        'src': './src/css/sass/**/*.scss',
        'dest': './css/css'

    },
    'js': {
        'src': [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/tether/dist/js/tether.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/owl.carousel/dist/owl.carousel.min.js',
            './src/js/*.js'
        ],
        'dest': './js'
    },
    'img': {
        'src': './src/img/*',
        'dest': './img/'
    },
    'fonts': {
        'src': [
            './node_modules/font-awesome/fonts/*',
            './src/fonts/*'
        ],
        'dest': './fonts/'
    }
};

//gulp-htmlmin

gulp.task('minify:html', function() {
    return gulp.src(config.html.src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(config.html.dest))
        .pipe(browserSync.reload({
            stream: true
    }))
});


gulp.task('styles', function() {
    return gulp.src([config.sass.src])
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: '> 5%'
        }))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(browserSync.reload({
            stream: true
        }))

});

gulp.task('minify:img', function () {
        return gulp.src(config.img.src)
            .pipe(imagemin())
            .pipe(gulp.dest(config.img.dest));
    }
);

gulp.task('fonts', function () {
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest))
        .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('js', function () {
    return gulp.src(config.js.src)
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('clean', function () {
    return gulp.src(['./css', '/*.html', './js', './img', './fonts'], { read: false })
        .pipe(clean());
});

gulp.task('build', function (callback) {
    runSequence('clean', [ 'minify:html', 'styles', 'js', 'minify:img','fonts'], callback)
});

gulp.task('browser-sync', ['styles'], function() {
    browserSync.init({
        server: {
            baseDir: config.dest
        }
    });
});


gulp.task('watch',['browser-sync', 'styles', 'minify:html'], function () {
    gulp.watch(config.sass.src, ['styles']);
    gulp.watch(config.html.src, ['minify:html']);
    gulp.watch('src/js/**/*.js',['js']);
});

gulp.task('default', function (callback) {
    runSequence(['styles','browser-sync', 'watch'],
        callback
    )
});

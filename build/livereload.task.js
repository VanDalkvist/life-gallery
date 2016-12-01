// dependencies

var path = require('path');
var gulp = require('gulp');
var connect = require('gulp-connect');

// initialization

var paths = {
    app: path.join(__dirname, '../src')
};

var config = {
    html: path.join(paths.app, '/**/*.html'),
    js: path.join(paths.app, '/**/*.js'),
    css: path.join(paths.app, '/**/*.css')
};

// tasks

gulp.task('livereload', ['livereload-connect', 'livereload-watch']);

gulp.task('livereload-connect', function () {
    connect.server({
        root: paths.app,
        livereload: true,
        fallback: paths.app + '/index.html',
        port: 3111
    });
});

var reloaderTasks = [];
for (var key in config) {
    if (!config.hasOwnProperty(key)) continue;

    var reloaderName = 'livereload-' + key;
    gulp.task(reloaderName, _getReloader(config[key]));
    reloaderTasks.push(reloaderName);
}

gulp.task('livereload-watch', function () {
    return gulp.watch([config.html, config.js, config.css], reloaderTasks);
});

// private methods

function _getReloader(src) {
    return function () {
        return gulp.src(src).pipe(connect.reload());
    }
}
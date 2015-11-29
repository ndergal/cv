var gulp = require('gulp');
var shell = require('gulp-shell');

var listen_ip = '0.0.0.0';
var listen_port = 4000;
var notify_reload_listen_port = 35729;

var serv_dir = './src/export';

gulp.task('html',
    shell.task('ruby ./src/ruby/gen-html.rb'));

gulp.task('styles',
    shell.task('ruby ./src/ruby/gen-css.rb'));

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')(
        {port: notify_reload_listen_port}
    ));
    app.use(express.static(serv_dir));
    app.listen(listen_port, listen_ip);
});

gulp.task('copy-assets', function() {
    return gulp.src([
        './node_modules/font-awesome/**'
    ])
    .pipe(gulp.dest(serv_dir +'/assets/font-awesome'))
});

gulp.task('watch', function() {
    gulp.watch(
        ['./src/data/*.yaml','./src/templates/*.haml'],
        ['html']
    );
    gulp.watch('./src/sass/**/*.scss',['styles']);
    gulp.watch(
        [serv_dir + '/**/*.html', serv_dir + '/**/*.css'],
        notifyLiveReload
    );
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
    tinylr.listen(notify_reload_listen_port);
});

function notifyLiveReload(event) {
  var fileName = require('path')
    .relative(serv_dir, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task(
    'default',[
        'copy-assets',
        'styles',
        'html',
        'express',
        'livereload',
        'watch'],
    function() {
});

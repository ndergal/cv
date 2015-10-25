var gulp = require('gulp');
var shell = require('gulp-shell');
var open = require('gulp-open');

var listen_ip = '127.0.0.1';
var listen_port = 4000;
var notify_reload_listen_port = 35729;

gulp.task('md2resume2html', shell.task([
    './node_modules/markdown-resume/bin/md2resume html ./cv.md ./'
]));

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({port: notify_reload_listen_port}));
    app.use(express.static(__dirname));
    app.listen(listen_port, listen_ip);
});



gulp.task('watch', function() {
    gulp.watch('*.md', ['md2resume2html']);
    gulp.watch('*.html', notifyLiveReload);
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
    tinylr.listen(notify_reload_listen_port);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('open', function(){
  gulp.src(__filename)
    .pipe(open({uri: 'http://' + listen_ip + ':' + listen_port + '/cv.html'}));
});

gulp.task(
    'default',
    ['md2resume2html',
        'express',
        'livereload',
        'watch',
        'open'],
    function() {
});

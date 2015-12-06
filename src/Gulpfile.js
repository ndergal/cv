var gulp = require('gulp');
var shell = require('gulp-shell');
var gulpsync = require('gulp-sync')(gulp);
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');

var listen_ip = '0.0.0.0';
var listen_port = 4000;
var notify_reload_listen_port = 35729;

var serv_dir = './export';
var deploy_dir = process.env.DEPLOY_DIR || './dduportal.github.io'

var font_awesome_dir = '../node_modules/font-awesome'

gulp.task('clean',shell.task([
    'rm -rf ' + serv_dir,
    'mkdir -p ' + serv_dir + '/min ' + serv_dir + '/styles ' + serv_dir + '/fonts'
]));

gulp.task('init', gulpsync.sync(['clean','html','styles','fonts']));

gulp.task('html', gulpsync.sync([
    'gen-html',
    'html-minify'
]));

gulp.task('styles', gulpsync.sync([
    'gen-styles',
    'copy-additional-styles',
    'styles-minify'
]));

gulp.task('fonts', gulpsync.sync([
    'copy-fonts',
    'fonts-minify'
]));

gulp.task('gen-html',
    shell.task('ruby ./ruby/gen-html.rb')
);

gulp.task('gen-styles',
    shell.task('ruby ./ruby/gen-css.rb')
);

gulp.task('copy-additional-styles', function(){
    return gulp.src([
        font_awesome_dir + '/css/font-awesome.min.css',
    ])
        .pipe(gulp.dest(serv_dir + '/styles/'));
});

gulp.task('html-minify',function(){
    return gulp.src(serv_dir + '/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(serv_dir + '/min/'));
});

gulp.task('styles-minify',function(){
    return gulp.src([serv_dir + '/styles/*.css'])
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(serv_dir + '/min/styles/'));
})

gulp.task('copy-fonts', function() {
    return gulp.src(font_awesome_dir + '/fonts/**')
        .pipe(gulp.dest(serv_dir +'/fonts/'));
});

gulp.task('fonts-minify',function(){
    return gulp.src([
        serv_dir + '/fonts/fontawesome-webfont.woff'
    ])
        .pipe(gulp.dest(serv_dir + '/min/fonts/'));
});

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')(
        {port: notify_reload_listen_port}
    ));
    app.use(express.static(serv_dir));
    app.listen(listen_port, listen_ip);
});



gulp.task('watch', function() {
    gulp.watch(
        ['./data/*.yaml','./templates/*.haml'],
        ['html']
    );
    gulp.watch('./sass/**/*.scss',['styles']);
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

gulp.task('deploy', function() {
    return gulp.src(serv_dir + '/min/**')
      .pipe(gulp.dest(deploy_dir + '/'));
});

gulp.task(
    'default',[
        'init',
        'express',
        'livereload',
        'watch'],
    function() {
});

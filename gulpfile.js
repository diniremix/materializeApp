'use strict';

var args        = require('yargs').argv,
		gulp        = require('gulp'),
		$           = require('gulp-load-plugins')(),
		path        = require('path'),
		runSequence = require('run-sequence'),
		gulpsync    = $.sync(gulp),
		PluginError = $.util.PluginError,
		del         = require('del'),
		connect = require('gulp-connect'),
		gutil       = require('gulp-util'),
		sequence    = require('run-sequence'),
		plumber     = require('gulp-plumber'),
		rename     = require("gulp-rename"),
		prettify    = require('gulp-prettify'),
		less         = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer'),
		csscomb      = require('gulp-csscomb'),
		notify      = require('gulp-notify'),
		minify       = require('gulp-minify-css'),
		server_port = 9876,
		// a delay before triggering browser reload to ensure everything is compiled
		livereloadDelay = 1500;

//--------------------------------------------------------------------------------
// variables
//--------------------------------------------------------------------------------
// config
var config      = require('./config.json');
// vendor
var vendor = {
  base: {
    source: require('./vendor.json'),
    csscomb: require('./.csscomb.json'),
    name: 'vendor.js'
  }
};

function pumped (achievement) {
  var exclamations = [
    'Sweet',
    'Awesome',
    'Epic',
    'Wow',
    'Yippee ki-yay',
    'Yay',
    'YEAH!',
    'Exitos',
    'Booyah'
  ];

  var randomIndex = Math.floor(Math.random() * exclamations.length);

  return [exclamations[randomIndex], '! ', achievement].join('');
};

var paths={
		index:[
			config.source.html.index + '/index.html',
		],
		views:[
			config.source.html.partials + '/*.html',
			config.source.html.views + '/*.html',
			config.source.shared.html + '/*.html'
		],
		scripts:[
			config.source.js.main + '/main.js',
			config.source.js.modules + '/**/*.module.js',
			config.source.js.modules + '/**/*.js',
			config.source.shared.js + '/**/*.js'
		],
		styles:{
			css: config.source.styles.css + '/**/*.css',
			fonts: config.source.styles.fonts + '/**/*.*',
			less: config.source.styles.less + '/**/*.less',
			sass: config.source.styles.sass + '/**/*.sass'
		}
	}

var pkg = require('./package.json');

var isProduction = false;

// styles sourcemaps
//var useSourceMaps = false;
var useSourceMaps = false;

gutil.log(gutil.colors.green('Starting to Gulp! Please wait...'));

//-------------------------------------------------------------
// PROD TASK
//-------------------------------------------------------------
gulp.task('prod', function() {
  gutil.log(gutil.colors.blue('Starting build, in production mode...'));
  isProduction = true;
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    //log('Starting watch and LiveReload..');
    gutil.log(gutil.colors.green('Starting watch and LiveReload...'));

    $.livereload.listen();
    //watch and build views
    gulp.watch(paths.index,['html:index']);
    gulp.watch(paths.views,['html:views']);
    //watch and build scripts
    gulp.watch(paths.scripts,['scripts:apps']);

    // list of source file to watch for live reload
    var watchSource = [].concat(
      paths.index,
      paths.views,
      paths.scripts
    );

    gulp
        .watch(watchSource)
        .on('change', function(event) {
            setTimeout(function() {
                gutil.log(gutil.colors.blue('on change livereload ' + event.path));
                $.livereload.changed(event.path);
            }, livereloadDelay);
        });
});

gulp.task('html:index', function(done){
  return gulp.src(paths.index)
    .pipe(plumber())
    //.pipe( $.jade() )
    .pipe(plumber())
    .pipe(prettify(config.prettify))
    .pipe(plumber())
    .pipe( $.if(isProduction, $.htmlmin({collapseWhitespace: true}) ))
    .pipe(plumber())
    .pipe(gulp.dest(config.destination.index));
});

//-------------------------------------------------------------
// VENDOR TASK
//-------------------------------------------------------------
gulp.task('vendor:base', function() {
	var banner = '/*!\n' +
          ' * ' + pkg.name + ' (' + pkg.homepage + ')\n' +
          ' * Version ' + pkg.version + '\n' +
          ' * Copyright ' + new Date().getFullYear() + ' ' + pkg.author.name + '\n' +
          ' * Licensed under the ' + pkg.license + '\n' +
          ' */\n';
  gutil.log(gutil.colors.green('Copying base vendor assets...'));
    return gulp.src(vendor.base.source)
        .pipe(plumber())
        .pipe($.expectFile(vendor.base.source))
        .pipe(plumber())
        //.pipe($.if( isProduction, $.uglify() ))
        //.pipe(plumber())
        .pipe($.concat(vendor.base.name))
        .pipe(plumber())
        //.pipe( $.if(isProduction,$.header(banner)))
        .pipe($.header(banner))
        .pipe(plumber())
        .pipe(rename({
          extname: '.min.js'
        }))
        .pipe(gulp.dest(config.destination.js))
        .pipe(notify({
            message: pumped('Vendor libs Generated & Minified!'),
            onLast: true
          })
        );
});

// DEV STYLES
gulp.task('styles:app', function(done){
  var banner = '/*!\n' +
          ' * ' + pkg.name + ' (' + pkg.homepage + ')\n' +
          ' * Version ' + pkg.version + '\n' +
          ' * Copyright ' + new Date().getFullYear() + ' ' + pkg.author.name + '\n' +
          ' * Licensed under the ' + pkg.license + '\n' +
          ' */\n';

  return gulp.src(paths.styles.css)
    .pipe(plumber())
    .pipe(autoprefixer(config.autoprefixerBrowsers))
    .pipe(plumber())
    .pipe(csscomb(vendor.base.csscomb))
    .pipe(plumber())
    .pipe( $.if(isProduction, minify(config.minify)))
    .pipe(plumber())
    .pipe($.header(banner))
    .pipe(plumber())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(config.destination.css))
    .pipe(notify({
        message: pumped('CSS Generated & Minified!'),
        onLast: true
      })
    );
});

gulp.task('dist-css', function(done){
  //sequence('styles:clean', 'styles:site', function(){
  sequence('styles:app', function(){
    done();

    notifaker(pumped('CSS Generated!'));
  });
});

gulp.task('webserver', ['watch'], function() {
    connect.server({
        livereload: true,
        root: ['dist/'],
        port: server_port
    });
});

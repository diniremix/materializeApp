'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence');

// include all tasks from separated files (./tasks)
require('require-dir')('./tasks');

// -------------------- PROCESS ALL JS --------------------
gulp.task('js_all', ['js_angular_common','js_app','js_app_minify','js_common','js_minify']);

// -------------------- PROCESS ALL LESS ------------------
gulp.task('less_all', ['less_main','less_themes','less_my_theme','less_style_switcher']);

// -------------------- DEFAULT TASK ----------------------
gulp.task('default', function(callback) {
    return runSequence(
        ['js_all','less_all','json_minify'],
        callback
    );
});


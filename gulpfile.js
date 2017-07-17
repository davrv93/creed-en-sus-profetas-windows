var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('serve', function() {
    connect.server({
        port: 80,
        host: 'localhost'
    });
});


gulp.task('stop', function() {
  connect.serverClose();
});

gulp.task('disconnect', function () {
  return connect.serverClose();
});
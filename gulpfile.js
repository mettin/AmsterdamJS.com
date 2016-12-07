var gulp = require('gulp');
var minimist = require('minimist');
var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

var args = minimist(process.argv.slice(2));

gulp.task('deploy', function () {
  var remotePath = '/domains/amsterdamjs.com/';
  var conn = ftp.create({
    host: 'indigo.elastictech.org',
    user: args.user,
    password: args.password,
    log: gutil.log
  });
  gulp.src([
      './**/*.*',
      '!./.*',
      '!./node_modules/**/*.*'
    ])
    .pipe(conn.newer(remotePath))
    .pipe(conn.dest(remotePath));
});

gulp.task('build', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('dev', function () {
  gulp.watch('./sass/**/*.scss', ['build']);
});

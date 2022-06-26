const gulp = require('gulp'); // Подключаем Gulp
global.browserSync = require('browser-sync').create(); // Делаем browserSync глоабальным, чтобы всегда обновлялся единственный один и тот же сервер
var requireDir = require('require-dir');

requireDir('./gulp-tasks/development');

/* *****************************
 * Таски для разработки
 ***************************** */

gulp.task(
  'build::dev',
  gulp.series('clean:web', gulp.parallel('scss', 'pug:pages', 'copy:js'))
);

gulp.task('server::dev', gulp.parallel('server:web', 'watch:web'));
gulp.task('default', gulp.series('build::dev', 'server::dev'));

const gulp = require('gulp'); // Подключаем Gulp

gulp.task('server:web', function () {
  browserSync.init({
    notify: false,
    server: { baseDir: './web/' },
  });
});

const gulp = require('gulp'); // Подключаем Gulp
const del = require('del');

gulp.task('clean:web', function () {
  return (
    del('./web/css/main.css'), del('./web/*.html'), del('./web/js/main.js')
  );
});

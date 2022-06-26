const gulp = require("gulp"); // Подключаем Gulp
const watch = require("gulp-watch");

// Слежение за HTML и CSS и обновление браузера
gulp.task("watch:web", function () {
  // Запуск слежения и компиляции SCSS с задержкой
  watch("./src/scss/**/*.scss", function () {
    setTimeout(gulp.parallel("scss"), 250);
  });

  // Слежение за PUG и сборка страниц и шаблонов
  watch("./src/pug/**/*.pug", gulp.parallel("pug:pages"));

  // Слежение и копирование статических файлов и скриптов
  // watch("./src/img/**/*.*", gulp.parallel("copy:img"));
  // watch("./src/vendor/**/*.*", gulp.parallel("copy:vendor"));
  watch("./src/js/**/*.*", gulp.parallel("copy:js"));
});

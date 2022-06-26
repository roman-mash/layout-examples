const gulp = require("gulp"); // Подключаем Gulp

// Следим за картинками images
// gulp.task("copy:img", function (callback) {
//   return gulp.src("./src/img/**/*.*").pipe(gulp.dest("./build/img/")).pipe(browserSync.stream());
//   callback();
// });

// // Следим за картинками Upload
// gulp.task("copy:vendor", function (callback) {
//   return gulp.src("./src/vendor/**/*.*").pipe(gulp.dest("./build/vendor/")).pipe(browserSync.stream());
//   callback();
// });

// gulp.task("copy:css", function (callback) {
//   return gulp.src("./src/css/**/*.*").pipe(gulp.dest("./build/css/")).pipe(browserSync.stream());
//   callback();
// });

// Следим за скриптами
gulp.task("copy:js", function (callback) {
  return gulp.src("./src/js/**/*.*").pipe(gulp.dest("./web/js/")).pipe(browserSync.stream());
  callback();
});

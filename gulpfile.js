// Импорт основного модуля
import gulp from 'gulp';
const parallel = gulp.parallel;
const series = gulp.series;
const watch = gulp.watch;

// Импорт общих плагинов
import { plugins } from './config/gulp-plugins.js';
// Импорт путей
import { path } from './config/gulp-settings.js';

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: process.argv.includes('--dev'),
  dest: gulp.dest,
  src: gulp.src,
  path,
  plugins,
};

// Импорт задач
import { copy } from './config/gulp-tasks/copy.js';
import { css } from './config/gulp-tasks/css.js';
import { reset } from './config/gulp-tasks/del.js';
import { fontsStyle, otfToTtf, ttfToWoff } from './config/gulp-tasks/fonts.js';
import { html } from './config/gulp-tasks/html.js';
import { img } from './config/gulp-tasks/img.js';
import { script } from './config/gulp-tasks/script.js';
import { server } from './config/gulp-tasks/server.js';
import { svgSprites } from './config/gulp-tasks/svgSprite.js';
import { zip } from './config/gulp-tasks/zip.js';

// наблюдает за изменениями в файлах
const watcher = () => {
  watch(path.watch.html, html);
  watch(path.watch.css, css);
  watch(path.watch.js, script);
  watch(path.watch.img, img);
  watch(path.watch.svg, svgSprites);
  watch(path.watch.files, copy);
};

// Последовательная обработка шрифтов
const fonts = series(otfToTtf, ttfToWoff, fontsStyle);

// основные задачи
const mainTasks = series(fonts, parallel(copy, html, css, script, img, svgSprites));

// сценарий разработки
const devTasks = series(reset, mainTasks, parallel(watcher, server));
const buildTasks = series(reset, mainTasks);
const zipTasks = series(buildTasks, zip);

// Экспорт задач
export { html };
export { css };
export { script };
export { img };
export { svgSprites };
export { fonts };
export { zip };
// Экспорт сценариев
export { devTasks };
export { buildTasks };

// Выполнение сценария по умолчанию
// exports.default = series(devTasks);
// exports.build = series(buildTasks);
// exports.zip = series(zipTasks);
gulp.task('default', devTasks);
gulp.task('build', buildTasks);
gulp.task('zip', zipTasks);

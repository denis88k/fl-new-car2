// Импортируем модули
import browserSync from 'browser-sync';
import ifPlugin from 'gulp-if'; // проверка условий
import newer from 'gulp-newer'; // проверяет обновление файлов
import notify from 'gulp-notify'; // вывод уведомление об ошибках
import plumber from 'gulp-plumber'; // не выбивает работу gulp если обнаружится ошибка, а покажет её

// Экспортируем объект
export const plugins = {
  notify,
  if: ifPlugin,
  newer,
  plumber,
  browserSync,
};

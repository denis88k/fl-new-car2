import del from 'del';
import zipPlugin from 'gulp-zip';

export const zip = () => {
  del(`./${app.path.projectFolder}.zip`);
  return app
    .src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'ZIP',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(zipPlugin(`${app.path.projectFolder}.zip`))
    .pipe(app.dest('./'));
};

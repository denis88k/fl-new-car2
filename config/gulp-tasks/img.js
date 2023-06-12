// import imagemin, { gifsicle, mozjpeg, optipng } from 'gulp-imagemin';
import webp from 'gulp-webp';

export const img = () => {
  return (
    app
      .src(app.path.src.img)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'IMG',
            message: 'Error: <%= error.message %>',
          }),
        ),
      )
      .pipe(app.plugins.newer(app.path.build.img))
      // .pipe(
      //   webp({
      //     quality: 100,
      //   }),
      // )
      .pipe(app.dest(app.path.build.img))
    // .pipe(app.src(app.path.src.img))
    // .pipe(app.plugins.newer(app.path.build.img))
    // .pipe(
    //   app.plugins.if(
    //     app.isBuild,
    //     imagemin([
    //       gifsicle({ interlaced: true }),
    //       mozjpeg({ quality: 100, progressive: true }),
    //       optipng({ optimizationLevel: 5 })]),
    //   ),
    // )
    // .pipe(app.dest(app.path.build.img))
  );
};

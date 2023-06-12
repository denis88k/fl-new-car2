import svgSprite from 'gulp-svg-sprite';
import svgMin from 'gulp-svgmin';

export const svgSprites = () => {
  return app
    .src(app.path.src.svg)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SVG',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      svgMin({
        js2svg: {
          pretty: true,
        },
        plugins: ['removeViewBox', 'removeComments'],
      }),
    )
    .pipe(
      svgSprite({
        mode: {
          // symbol: {
          stack: {
            sprite: './../sprite.svg',
          },
        },
      }),
    )
    .pipe(app.dest(app.path.build.img));
};

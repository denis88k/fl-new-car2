export const copy = () => {
  return app.src(app.path.src.files).pipe(app.dest(app.path.build.files));
};

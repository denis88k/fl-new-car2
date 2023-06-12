// Получаем имя папки проекта в которой работаем
import * as nodePath from 'path';
// папка с результатом
const projectFolder = nodePath.basename(nodePath.resolve());
// const buildFolder = `./dist`;
const buildFolder = `${projectFolder}`;
const sourceFolder = './src'; // папка с исходниками

export const path = {
  src: {
    html: [sourceFolder + '/html/*.html', '!' + sourceFolder + '/html/_*.html'],
    css: sourceFolder + '/scss/style.scss',
    js: sourceFolder + '/js/main.js',
    img: [sourceFolder + '/img/**/*.{jpg,jpeg,png,gif,ico,webp,svg}', '!' + sourceFolder + '/img/svg/**/*.svg'],
    svg: [sourceFolder + '/img/svg/**/*.svg'],
    fonts: sourceFolder + '/fonts/*.*',
    files: sourceFolder + '/files/*.*',
  },
  build: {
    html: buildFolder + '/',
    css: buildFolder + '/css/',
    js: buildFolder + '/js/',
    img: buildFolder + '/img/',
    fonts: buildFolder + '/fonts/',
    files: buildFolder + '/files/',
  },
  watch: {
    html: sourceFolder + '/html/**/*.html',
    css: sourceFolder + '/scss/**/*.scss',
    js: sourceFolder + '/js/**/*.js',
    img: sourceFolder + '/img/**/*.{jpg,jpeg,png,gif,ico,webp,svg}',
    svg: [sourceFolder + '/img/svg/**/*.svg'],
    files: sourceFolder + '/files/*.*',
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  projectFolder: projectFolder,
  sourceFolder: sourceFolder,
};

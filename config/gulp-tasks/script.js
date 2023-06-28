// import EsbuildPlugin from 'esbuild-loader';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

export const script = () => {
	return app
		.src(app.path.src.js)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'JS',
					message: 'Error: <%= error.message %>',
				}),
			),
		)
		.pipe(
			webpackStream({
				mode: app.isBuild ? 'production' : 'development',
				optimization: {
					minimize: app.isBuild ? true : false,
					minimizer: [app.isBuild ? new TerserPlugin() : '...'],
					// minimizer: [app.isBuild ? new EsbuildPlugin({ target: 'es2015' }) : ''],
					// minimizer: [new EsbuildPlugin({ target: 'es2015' })],
				},
				output: {
					filename: 'main.min.js',
				},
				module: {
					rules: [
						{
							test: /\.m?js$/,
							exclude: /node_modules/,
							use: {
								loader: 'babel-loader',
								options: {
									presets: [
										[
											'@babel/preset-env',
											{
												targets: 'defaults',
											},
										],
									],
								},
							},
						},
						// {
						// 	test: /\.js?$/,
						// 	loader: 'esbuild-loader',
						// 	options: {
						// 		// JavaScript version to compile to
						// 		target: 'es2015',
						// 	},
						// },
					],
				},
				resolve: { extensions: ['.js'] },
				devtool: app.isDev ? 'source-map' : false,
			}),
			webpack,
		)
		.on('error', function (error) {
			console.error('WEBPACK ERROR', error);
			this.emit('end');
		})

		.pipe(app.dest(app.path.build.js))
		.pipe(app.plugins.browserSync.stream());
};

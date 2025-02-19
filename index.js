const mix = require('laravel-mix');
const ServePlugin = require('./src/ServePlugin');

class Serve {
	name() {
		return 'serve';
	}

	register(userConfig) {
		const defaultConfig = {
			artisan: true,
			host: '127.0.0.1',
			port: '8000',
			target: null,
			verbose: true,
		};

		if (userConfig !== undefined) {
			this.config = { ...defaultConfig, ...userConfig };
		} else {
			this.config = defaultConfig;
		}
	}

	webpackPlugins() {
		return new ServePlugin(this.config);
	}
}

mix.extend('serve', new Serve());

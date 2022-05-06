const command = require('node-cmd');

class ServePlugin {
	constructor(config) {
		this.serveConfig = config;
	}

	apply(compiler) {
		compiler.hooks.watchRun.tap('ServePlugin', (compilation) => {
			console.log(`Serving application at: http://${this.serveConfig.host}:${this.serveConfig.port}`);

			if (this.serveConfig.artisan) {
				command.get(
					`php artisan serve --host ${this.serveConfig.host} --port ${this.serveConfig.port}`,
					(err, stdout, stderr) => {
						console.log(err ? stderr : stdout);
					}
				);
			} else {
				let conf = '';
				if (this.serveConfig.target) {
					console.log(`Target root directory ${this.serveConfig.target}`);
					conf = ` -t ${this.serveConfig.target}`;
				}
				command.get(
					`php -S ${this.serveConfig.host}:${this.serveConfig.port} ${conf}`,
					(err, stdout, stderr) => {
						console.log(err ? stderr : stdout);
					}
				);
			}
		});
	}
}

module.exports = ServePlugin;

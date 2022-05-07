const { exec } = require('child_process');

class ServePlugin {
	constructor(config) {
		this.childProccess = null;
		this.config = config;
	}

	apply(compiler) {
		compiler.hooks.watchRun.tap('ServePlugin', () => {
			const conf = this.config;
			if (this.childProccess == null) {
				console.log(`Serving application at: http://${conf.host}:${conf.port}`);
				const command =
					conf.artisan ?? false
						? `php artisan serve --host ${conf.host} --port ${conf.port}`
						: `php -S ${conf.host}:${conf.port} ${conf.target ? `-t ${conf.target}` : ''}`;

				conf.artisan === false && conf.target && console.log(`Target root directory ${conf.target}`);

				this.childProccess = exec(command);
				if (conf.verbose) {
					this.childProccess.stdout.setEncoding('utf8');
					this.childProccess.stderr.on('data', (data) => {
						console.log(`${data.toString().replace(/(\r\n|\n|\r)/gm, '')} `);
					});
				}
				this.childProccess.on('close', (code) => {
					console.info(`child process exited with code ${code}`);
				});
				this.childProccess.ref();
			}
		});
	}
}

module.exports = ServePlugin;

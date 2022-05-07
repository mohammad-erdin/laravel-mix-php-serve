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
				const command = conf.artisan ?? false
					? `php artisan serve --host ${conf.host} --port ${conf.port}`
					: `php -S ${conf.host}:${conf.port} ${conf.target ? `-t ${conf.target}` : ''}`;

				conf.artisan === false
					&& conf.target
					&& console.log(`Target root directory ${conf.target}`);

				const subprocess = exec(command);
                if(conf.verbose){
                    subprocess.stdout.setEncoding('utf8');
                    subprocess.stderr.on('data', (data) => {
                        console.log(`${data.toString().replace(/(\r\n|\n|\r)/gm, '')} `);
                    });
                }
				subprocess.on('close', (code) => {
					console.info(`child process exited with code ${code}`);
				});
				subprocess.ref();
			}
		});
	}
}

module.exports = ServePlugin;

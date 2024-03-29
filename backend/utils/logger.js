const winston = require('winston');

const logger = winston.createLogger({
	level: 'silly',
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp(),
		winston.format.align(),
		winston.format.printf((info) => {
			const {
				timestamp, level, message, ...args
			} = info;

			const ts = timestamp.slice(0, 19).replace('T', ' ');
			return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
		}),
	),
	transports: [
		new winston.transports.Console()
	]
})

module.exports = logger;

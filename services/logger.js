const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');
const { LOGGER } = require("../constant/constant");

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message} `;
});
const dailyTransportOpts = {
    filename: './logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '1k', //20m
    maxFiles: '14d'
}

let transportArray = [];

if (LOGGER.ADD_ERROR_FILE)
    transportArray.push(new transports.File({
        filename: './logs/error.log',
        level: 'error',
        format: format.combine(
            // Render in one line in your log file.
            // If you use prettyPrint() here it will be really
            // difficult to exploit your logs files afterwards.
            format.json()
        )
    }));

if (LOGGER.ADD_INFO_FILE)
    transportArray.push(new transports.File({
        filename: './logs/info.log',
        format: format.combine(
            // Render in one line in your log file.
            // If you use prettyPrint() here it will be really
            // difficult to exploit your logs files afterwards.
            format.json()
        )
    }));

if (LOGGER.CONSOLE_ON)
    transportArray.push(new transports.Console());

if (LOGGER.DAILY_ROTATE_LOG_ON)
    transportArray.push(new transports.DailyRotateFile(dailyTransportOpts));

const logger = createLogger({
    format: combine(
        label({ label: 'Admin Service' }),
        timestamp(),
        myFormat,
        format.prettyPrint()
    ),
    transports: transportArray
});
module.exports = { logger };
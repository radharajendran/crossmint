const winston = require('winston');
const path = require('path');
const logDir = path.join(__dirname, '../../log');

const level = process.env.NODE_ENV !== 'production' && 'debug' || 'warn';

const getLogParams =  (fileName, newlevel) => {

    return {
        json: false,
        maxsize: 5 * 1024 * 1024,
        filename: fileName,
        tailable: true,
        maxFiles: 100,
        level: newlevel || level,

        timestamp: function () {
            return moment().format();
        },

        formatter: function (options) {
            let { 
                timestamp,
                level,
                message,
                meta } = options;

            return `${process.pid}  ${timestamp()} ${level.toUpperCase()} ${undefined !== message ? message : ''} ${meta && Object.keys(meta).length ? ', ' + JSON.stringify(meta) : '' }`
        }
    };
}

const logger = winston.createLogger({
    level: this.level,
    exitOnError: false,
    transports: [
        new (winston.transports.Console)({}),
        new (winston.transports.File)(getLogParams(path.join(logDir, 'megaverse_service.log')))
    ]
});

const loggerUtil = {

    initialize: () => {

        logger.emitErrs = true;

        logger.on('logging', (transport, level, msg, meta) => {
            // [msg] and [meta] have now been logged at [level] to [transport]
        });

        logger.on('error', (err) => {
            console.error(err);
        });
    },

    logInfo: (message, metaData) => {
        logger.log({
            level: 'info',
            message: message,
            ...metaData
        });
    },

    logWarning:  (message, metaData) => {
        logger.log({
            level: 'warn',
            message: message,
            ...metaData
        });
    },

    logDebug: (message,metaData) => {
        logger.log({
            level: 'debug',
            message: message,
            ...metaData
        });
    },

    logError: (message, metaData) => {
        let messageString = typeof message === `string`
            ? message
            : JSON.stringify(message);

        if (!metaData) {
            metaData = {};
        }

        if( typeof metaData == 'object' ) {
            messageString += `, ${JSON.stringify(metaData)}`;
        }

        if (!metaData.callStack) {
            try {
                var stack = new Error().stack;
                metaData.callstack = stack.toString();
            } catch (err) {
            }
        }

        if ( process.env.NODE_ENV == 'development' ) {
            console.trace(metaData);
            console.log(messageString, metaData);
        }
        logger.log({
            level: 'error',
            message: message,
            ...metaData
          });
    }
}

module.exports = loggerUtil;
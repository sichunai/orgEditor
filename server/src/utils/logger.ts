import winston, { format, Logger } from 'winston';

let logger: Logger;

logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        // Redactor
        //format(redactor)(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.json()
    ),

    defaultMeta: { service: 'okay-app' },
    transports: [
        new winston.transports.Console({})
    ]
});

export {logger};
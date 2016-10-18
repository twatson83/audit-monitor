import winston from "winston";
import config from "../config";

const logger = new (winston.Logger)({
    level: 'verbose',
    transports: [
        new (winston.transports.Console)({
            level: config.logging.level
        }),
        new (winston.transports.File)({
            filename: 'server.log',
            level: config.logging.level
        })
    ]
});

export default logger;
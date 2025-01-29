// Import
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Défini les niveaux de log
const loglevel = {
    level: {
        info: 0,
        warn: 1,
        error: 2,
        crit: 3
    }
}

// Format des logs
const logFormat = format.combine(
    format.timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
);

// Crée un logger
export const logger = createLogger({
    levels: loglevel.level,
    format: logFormat,
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'logs', 'app-%DATE%.log'),
            datePattern: 'MM-DD-YYYY',
            maxSize: '5m'
        }),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'logs', 'error-%DATE%.log'),
            datePattern: 'MM-DD-YYYY',
            maxSize: '5m',
            level: 'error', // Capture uniquement "error" et "crit"
            format: format.combine(
                format((info) => (info.level === 'error' || info.level === 'crit' ? info : false))(), // Filtre
                logFormat
            )
        }),
    ]
});

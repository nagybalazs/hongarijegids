import * as winston from 'winston';
import { injectable } from 'inversify';

@injectable()
export class Logger {
    
    private _logger: winston.LoggerInstance;

    get logger(): winston.LoggerInstance {
        return this._logger;
    }

    constructor() {
        let environment = process.env.NODE_ENV;

        this._logger = new winston.Logger();

        if(environment == 'production') {
            this._logger.level = 'debug';
            this._logger.add(winston.transports.File, { filename: 'log.log' });
        }
        else {
            this._logger.level = 'silly';
            this._logger.add(winston.transports.Console);
        }

    }

    public silly(msg: string, ...meta: any[]): winston.LoggerInstance {
        return this._logger.silly(msg, ...meta);
    }

    public debug(msg: string, ...meta: any[]): winston.LoggerInstance {
        return this._logger.debug(msg, ...meta);
    }

    public verbose(msg: string, ...meta: any[]): winston.LoggerInstance {
        return this._logger.verbose(msg, ...meta);
    }

    public info(msg: string, ...meta: any[]): winston.LoggerInstance {
        return this._logger.info(msg, ...meta);
    }

    public warn(msg: string, ...meta: any[]): winston.LoggerInstance {
        return this._logger.warn(msg, ...meta);
    }

    public error(msg: string, ...meta: any[]): winston.LoggerInstance {
        return this._logger.error(msg, ...meta);
    }
}
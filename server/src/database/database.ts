import * as mysql from 'mysql';
import { injectable, inject } from 'inversify';
import { IDatabaseConfig } from './index';
import 'reflect-metadata';

@injectable()
export class Database {
    
    private _config: IDatabaseConfig;

    constructor(@inject(Symbol.for("IDatabaseConfig")) config: IDatabaseConfig) { 
        this._config = config;
    }

    get connection(): mysql.Connection {
        let connection: mysql.Connection = mysql.createConnection({
            port: this._config.port,
            user: this._config.user,
            password: this._config.password,
            host: this._config.host,
            database: this._config.database
        });
        return connection;
    }
    
}
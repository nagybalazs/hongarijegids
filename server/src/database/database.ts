import config from '../config';
import * as mysql from 'mysql';
import { injectable } from 'inversify';

@injectable()
export class Database {
    
    constructor() { }

    get connection() {
        let connection: mysql.Connection = mysql.createConnection({
            port: config.mysqlConfig.port,
            user: config.mysqlConfig.user,
            password: config.mysqlConfig.password,
            host: config.mysqlConfig.host,
            database: config.mysqlConfig.database
        });
        return connection;
    }

}
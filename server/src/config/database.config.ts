import * as config from '../config';
import { IDatabaseConfig } from '../database/index';
import { injectable } from 'inversify';

@injectable()
export class DatabaseConfig implements IDatabaseConfig {
    
    get user(): string {
        return config.default.mysqlConfig.user;
    }

    get password(): string {
        return config.default.mysqlConfig.password;
    }

    get port(): number {
        return config.default.mysqlConfig.port;
    };

    get host(): string {
        return config.default.mysqlConfig.host;
    };

    get database(): string {
        return config.default.mysqlConfig.database;
    };
}
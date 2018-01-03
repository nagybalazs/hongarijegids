import { ISmtpConfig } from '../smtp/index';
import { injectable } from 'inversify';
import config from '../config';

@injectable()
export class SmtpConfig implements ISmtpConfig {

    get host(): string {
        return config.smtpConfig.host;
    }

    get port(): number {
        return config.smtpConfig.port;
    }

    get user(): string {
        return config.smtpConfig.user;
    }

    get password(): string {
        return config.smtpConfig.password;
    }

    get secure(): boolean {
        return config.smtpConfig.secure;
    }

}
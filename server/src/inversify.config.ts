import 'reflect-metadata';
import { Container } from 'inversify';
import { IDatabaseConfig } from './database/index';
import { DatabaseConfig, SmtpConfig } from './config/index';
import { ISmtpConfig } from './smtp/index';

let container = new Container({ autoBindInjectable: true });
container.bind<IDatabaseConfig>(Symbol.for('IDatabaseConfig')).to(DatabaseConfig);
container.bind<ISmtpConfig>(Symbol.for('ISmtpConfig')).to(SmtpConfig)
export default container;
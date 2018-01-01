import 'reflect-metadata';
import { Container } from 'inversify';
import { IDatabaseConfig } from './database/index';
import { DatabaseConfig } from './config/database.config';

let container = new Container({ autoBindInjectable: true });
container.bind<IDatabaseConfig>(Symbol.for("IDatabaseConfig")).to(DatabaseConfig);
export default container;
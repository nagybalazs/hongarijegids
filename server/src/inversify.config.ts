import { Container } from 'inversify';
import 'reflect-metadata';

let container = new Container({ autoBindInjectable: true });
export default container;
import container from './inversify.config';
import { Server } from './server';
import 'reflect-metadata';

export class ServerFactory {

    public create() {
        return container.get(Server)
    }

}